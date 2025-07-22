import { useEffect, useState } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Modal from '@/components/modal'
import Notification from '@/components/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  InvoicesWrapper,
  Header,
  InvoiceForm,
  Field,
  Label,
  Select,
  ItemsContainer,
  ItemRow,
  Input,
  AddItemButton,
  RemoveItemButton,
  ButtonsWrapper,
  SubmitButton,
  CancelButton,
  SearchWrapper,
  SearchInput,
  InvoicesTable,
  ActionIcon,
  PaginationContainer,
  PaginationButton,
  LabelsRow,
  ButtonsRow
} from '@/styles/sales/invoice.styles'

function formatCurrency(value) {
  if (value === '' || isNaN(value)) return ''
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
}

function formatNumber(value) {
  if (value === '' || isNaN(value)) return ''
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function parseCurrency(value) {
  return value.replace(/[^0-9.]/g, '')
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])

  const [formData, setFormData] = useState({
    client: '',
    items: [{ product: '', quantity: 1, price: 0 }],
    invoiceNumber: '',
    dueDate: '',
    paid: false
  })

  const [notification, setNotification] = useState({ message: '', type: '' })
  const [confirmation, setConfirmation] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5

  useEffect(() => {
    fetchInvoices()
    fetchClients()
    fetchProducts()
  }, [])

  const fetchInvoices = async () => {
    try {
      const res = await axiosInstance.get('/invoice/')
      setInvoices(res.data)
    } catch {
      showNotification('Error al obtener facturas', 'error')
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
      invoiceNumber: '',
      dueDate: '',
      paid: false
    })
    setEditMode(false)
    setEditingInvoice(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleItemChange = (i, field, val) => {
    const newItems = [...formData.items]
    if (field === 'product') {
      const selected = products.find(p => p._id === val)
      newItems[i].product = val
      newItems[i].price = selected ? selected.price : 0
    } else if (field === 'quantity') {
      newItems[i][field] = Number(val)
    } else if (field === 'price') {
      const numericValue = parseFloat(parseCurrency(val)) || 0
      newItems[i][field] = numericValue
    }
    setFormData({ ...formData, items: newItems })
  }

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { product: '', quantity: 1, price: 0 }] })
  }

  const removeItem = (index) => {
    if (formData.items.length === 1) return
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  const totalCalc = () => formData.items.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...formData, total: totalCalc() }
    try {
      if (editMode) {
        await axiosInstance.put(`/invoice/${editingInvoice._id}`, payload)
        showNotification('Factura actualizada exitosamente')
      } else {
        await axiosInstance.post('/invoice/', payload)
        showNotification('Factura creada exitosamente')
      }
      fetchInvoices()
      resetForm()
    } catch (err) {
      showNotification(err.response?.data?.mensaje || 'Error al guardar factura', 'error')
    }
  }

  const confirmDelete = (inv) => {
    setConfirmation({
      message: `¿Eliminar factura ${inv.invoiceNumber}?`,
      onConfirm: () => deleteInvoice(inv._id),
      onCancel: () => setConfirmation(null)
    })
  }

  const deleteInvoice = async (id) => {
    try {
      await axiosInstance.delete(`/invoice/${id}`)
      showNotification('Factura eliminada exitosamente')
      fetchInvoices()
    } catch {
      showNotification('Error al eliminar factura', 'error')
    } finally {
      setConfirmation(null)
    }
  }

  const startEdit = (inv) => {
  setFormData({
    client: inv.client._id,
    items: inv.items.map(it => ({
      product: typeof it.product === 'object' && it.product !== null ? it.product._id : it.product,
      quantity: it.quantity,
      price: it.price
    })),
    invoiceNumber: inv.invoiceNumber,
    dueDate: inv.dueDate.split('T')[0],
    paid: inv.paid
  })
    setEditMode(true)
    setEditingInvoice(inv)
  }

  const filtered = invoices.filter(inv =>
    inv.client?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const displayed = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <InvoicesWrapper>
      <Header><h1>Facturas</h1></Header>

      <InvoiceForm onSubmit={handleSubmit}>
        <Field>
          <Label>Cliente</Label>
          <Select name="client" value={formData.client} onChange={handleChange} required>
            <option value="">Seleccionar cliente</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
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
              <Select value={it.product} onChange={e => handleItemChange(i, 'product', e.target.value)} required>
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

          <ButtonsRow>
            <AddItemButton type="button" onClick={addItem}>
              <FontAwesomeIcon icon={faPlus} /> Agregar ítem
            </AddItemButton>
            <RemoveItemButton
              type="button"
              onClick={() => removeItem(formData.items.length - 1)}
              disabled={formData.items.length === 1}
            >
              Eliminar
            </RemoveItemButton>
          </ButtonsRow>
        </ItemsContainer>

        <Field><Label>Número factura</Label>
          <Input name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required />
        </Field>

        <Field><Label>Fecha vencimiento</Label>
          <Input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </Field>

        <Field>
          <Label>
            <Input type="checkbox" name="paid" checked={formData.paid} onChange={handleChange} />
            Pagada
          </Label>
        </Field>

        <Field><Label>Total: ${formatNumber(totalCalc())}</Label></Field>

        <ButtonsWrapper>
          <SearchWrapper>
            <SearchInput
              placeholder="Buscar factura..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            />
            <FontAwesomeIcon icon={faSearch} />
          </SearchWrapper>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {editMode && (
              <CancelButton type="button" onClick={resetForm}>
                Cancelar
              </CancelButton>
            )}
            <SubmitButton type="submit">
              {editMode ? 'Actualizar' : 'Guardar'}
            </SubmitButton>
          </div>
        </ButtonsWrapper>
      </InvoiceForm>

      <InvoicesTable>
        <thead>
          <tr>
            <th>Cliente</th><th># Factura</th><th>Total</th><th>Vencimiento</th><th>Pagada</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map(inv => (
            <tr key={inv._id}>
              <td>{inv.client?.name || '-'}</td>
              <td>{inv.invoiceNumber}</td>
              <td>${formatNumber(inv.total)}</td>
              <td>{inv.dueDate.split('T')[0]}</td>
              <td>{inv.paid ? 'Sí' : 'No'}</td>
              <td>
                <ActionIcon type="edit" onClick={() => startEdit(inv)}>
                  <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon type="delete" onClick={() => confirmDelete(inv)}>
                  <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </InvoicesTable>

      <PaginationContainer>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationButton key={i} isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>

      {confirmation && <Modal {...confirmation} />}
      {notification.message && <Notification {...notification} />}
    </InvoicesWrapper>
  )
}