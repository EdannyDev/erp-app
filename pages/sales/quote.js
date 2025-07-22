import { useEffect, useState } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Modal from '@/components/modal'
import Notification from '@/components/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  QuotesWrapper,
  Header,
  QuoteForm,
  Field,
  Label,
  Select,
  ItemsContainer,
  ItemRow,
  Input,
  AddItemButton,
  SubmitButton,
  SearchWrapper,
  SearchInput,
  QuotesTable,
  ActionIcon,
  PaginationContainer,
  PaginationButton,
  ButtonGroup,
  RemoveItemButton,
  CancelButton,
  LabelsRow,
  SearchAndActionsContainer,
} from '@/styles/sales/quote.styles'

function formatCurrency(value) {
  if (value === '' || isNaN(value)) return ''
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
}

function parseCurrency(value) {
  return value.replace(/[^0-9.]/g, '')
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    client: '',
    items: [{ product: '', quantity: 1, price: 0 }],
    status: 'pendiente'
  })
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [confirmation, setConfirmation] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editingQuote, setEditingQuote] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const quotesPerPage = 5

  useEffect(() => {
    fetchQuotes()
    fetchClients()
    fetchProducts()
  }, [])

  const fetchQuotes = async () => {
    try {
      const res = await axiosInstance.get('/quote/')
      setQuotes(res.data)
    } catch {
      showNotification('Error al obtener cotizaciones', 'error')
    }
  }

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get('/client/')
      setClients(res.data)
    } catch {
      showNotification('Error al obtener clientes', 'error')
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/product/')
      setProducts(res.data)
    } catch {
      showNotification('Error al obtener productos', 'error')
    }
  }

  const showNotification = (msg, type = 'success') => {
    setNotification({ message: msg, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const resetForm = () => {
    setFormData({
      client: '',
      items: [{ product: '', quantity: 1, price: 0 }],
      status: 'pendiente'
    })
    setEditMode(false)
    setEditingQuote(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items]
    if (field === 'product') {
      const prod = products.find(p => p._id === value)
      newItems[index].product = value
      newItems[index].price = prod ? prod.price : 0
    } else if (field === 'quantity') {
      newItems[index][field] = Number(value)
    } else if (field === 'price') {
      const numericValue = parseFloat(parseCurrency(value)) || 0
      newItems[index][field] = numericValue
    }
    setFormData({ ...formData, items: newItems })
  }

  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantity: 1, price: 0 }]
    })
  }

  const removeItemRow = (index) => {
    if (formData.items.length === 1) return
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    })
  }

  const calculateTotal = () =>
    formData.items.reduce((sum, it) => sum + it.quantity * it.price, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...formData, total: calculateTotal() }

    try {
      if (editMode) {
        await axiosInstance.put(`/quote/${editingQuote._id}`, payload)
        showNotification('Cotización actualizada exitosamente')
      } else {
        await axiosInstance.post('/quote/', payload)
        showNotification('Cotización creada exitosamente')
      }
      fetchQuotes()
      resetForm()
    } catch (err) {
      showNotification(
        err.response?.data?.mensaje ||
        err.message ||
        'Error desconocido al guardar cotización',
        'error'
      )
    }
  }

  const confirmDelete = (quote) => {
    setConfirmation({
      message: `¿Eliminar cotización de ${quote.client.name}?`,
      onConfirm: () => deleteQuote(quote._id),
      onCancel: () => setConfirmation(null)
    })
  }

  const deleteQuote = async (id) => {
    try {
      await axiosInstance.delete(`/quote/${id}`)
      showNotification('Cotización eliminada exitosamente')
      fetchQuotes()
    } catch {
      showNotification('Error al eliminar cotización', 'error')
    } finally {
      setConfirmation(null)
    }
  }

  const startEdit = (quote) => {
    setFormData({
      client: quote.client._id,
      items: quote.items.map(it => ({
        product: typeof it.product === 'object' && it.product !== null ? it.product._id : it.product,
        quantity: it.quantity,
        price: it.price
      })),
      status: quote.status
    })
    setEditMode(true)
    setEditingQuote(quote)
  }

  const filteredQuotes = quotes.filter(q =>
    q.client?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage)
  const displayedQuotes = filteredQuotes.slice(
    (currentPage - 1) * quotesPerPage,
    currentPage * quotesPerPage
  )

  function formatDateLocalNoShift(dateString) {
    const date = new Date(dateString)
    const offset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - offset)
    return localDate.toISOString().split('T')[0]
  }

  return (
    <QuotesWrapper>
      <Header><h1>Cotizaciones</h1></Header>

      <QuoteForm onSubmit={handleSubmit}>
        <Field>
          <Label>Cliente</Label>
          <Select name="client" value={formData.client} onChange={handleChange} required>
            <option value="">Seleccionar cliente</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </Select>
        </Field>

        <ItemsContainer>
          <LabelsRow>
            <Label>Producto</Label>
            <Label>Cantidad</Label>
            <Label>Precio</Label>
          </LabelsRow>

          {formData.items.map((it, i) => (
            <ItemRow key={i}>
              <Select
                value={it.product}
                onChange={e => handleItemChange(i, 'product', e.target.value)}
                required
              >
                <option value="">Selecciona producto</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </Select>

              <Input
                type="number"
                min="1"
                value={it.quantity}
                onChange={e => handleItemChange(i, 'quantity', e.target.value)}
                required
              />

              <Input
                type="text"
                value={formatCurrency(it.price)}
                onChange={e => handleItemChange(i, 'price', e.target.value)}
                required
                disabled
              />
            </ItemRow>
          ))}

          <ButtonGroup>
            <AddItemButton type="button" onClick={addItemRow}>
              <FontAwesomeIcon icon={faPlus} /> Agregar ítem
            </AddItemButton>

            <RemoveItemButton
              type="button"
              onClick={() => removeItemRow(formData.items.length - 1)}
              disabled={formData.items.length === 1}
              title="Eliminar último ítem"
            >
              Eliminar
            </RemoveItemButton>
          </ButtonGroup>
        </ItemsContainer>

        <Field>
          <Label>Estado</Label>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="aceptada">Aceptada</option>
            <option value="rechazada">Rechazada</option>
          </Select>
        </Field>

        <Field>
          <Label>Total: {formatCurrency(calculateTotal())}</Label>
        </Field>

        <SearchAndActionsContainer>
          <SearchWrapper>
            <SearchInput
              placeholder="Buscar cotización..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
            <FontAwesomeIcon icon={faSearch} />
          </SearchWrapper>

          <ButtonGroup>
            {editMode && (
              <CancelButton type="button" onClick={resetForm}>
                Cancelar
              </CancelButton>
            )}
            <SubmitButton type="submit">
              {editMode ? 'Actualizar Cotización' : 'Crear Cotización'}
            </SubmitButton>
          </ButtonGroup>
        </SearchAndActionsContainer>
      </QuoteForm>

      <QuotesTable>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayedQuotes.map(q => (
            <tr key={q._id}>
              <td>{q.client?.name || '-'}</td>
              <td>{formatCurrency(q.total)}</td>
              <td>{q.status}</td>
              <td>{formatDateLocalNoShift(q.createdAt)}</td>
              <td>
                <ActionIcon type="edit" onClick={() => startEdit(q)}>
                  <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon type="delete" onClick={() => confirmDelete(q)}>
                  <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </QuotesTable>

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationButton
            key={i}
            isActive={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>

      {confirmation && <Modal {...confirmation} />}
      {notification.message && <Notification {...notification} />}
    </QuotesWrapper>
  )
}