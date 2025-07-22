import { useEffect, useState } from 'react'
import axios from '@/services/axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  ReceivingWrapper,
  Header,
  Form,
  Field,
  Label,
  Select,
  ItemContainer,
  ItemRow,
  ItemSelect,
  ItemInput,
  ItemButton,
  SubmitButton,
  Table,
  ActionIcon,
  SearchWrapper,
  SearchInput,
  PaginationContainer,
  PaginationButton,
  TopTableControls,
  FullWidthField,
  AddItemButtonWrapper,
  ItemLabel
} from '@/styles/purchase/receiving.styles'

export default function ReceivingPage() {
  const [orders, setOrders] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ purchaseOrder: '', warehouse: '' })
  const [items, setItems] = useState([])
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [showModal, setShowModal] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [receivings, setReceivings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [oRes, wRes, pRes, rRes] = await Promise.all([
        axios.get('/purchaseOrder/'),
        axios.get('/warehouse/'),
        axios.get('/product/'),
        axios.get('/receiving/')
      ])
      setOrders(oRes.data)
      setWarehouses(wRes.data)
      setProducts(pRes.data)
      setReceivings(rRes.data)
    } catch {
      showNotification('Error al cargar datos', 'error')
    }
  }

  const showNotification = (msg, type) => {
    setNotification({ message: msg, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleItemChange = (i, field, value) => {
    const arr = [...items]
    arr[i][field] = field === 'quantity' ? Number(value) : value
    setItems(arr)
  }

  const addItem = () => setItems([...items, { product: '', quantity: 1 }])
  const removeItem = idx => setItems(items.filter((_, i) => i !== idx))

  const handleRegisterClick = async () => {
    if (!form.purchaseOrder || !form.warehouse || items.length === 0)
      return showNotification('Completa todos los campos e ítems', 'error')

    try {
      await axios.post('/receiving/', {
        ...form,
        receivedItems: items
      })
      showNotification('Recepción registrada', 'success')
      setForm({ purchaseOrder: '', warehouse: '' })
      setItems([])
      fetchData()
    } catch (err) {
      showNotification(err.response?.data?.mensaje || 'Error al registrar', 'error')
    }
  }

  const confirmDelete = id => {
    setToDelete(id)
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/receiving/${toDelete}`)
      showNotification('Recepción eliminada', 'success')
      fetchData()
    } catch {
      showNotification('Error al eliminar', 'error')
    } finally {
      setShowModal(false)
      setToDelete(null)
    }
  }

  const filtered = receivings.filter(r =>
    String(r.purchaseOrder.code).toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const pageData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <ReceivingWrapper>
      <Header>
        <h1>Recepciones</h1>
      </Header>

      <Form>
        <Field>
          <Label>Orden de compra</Label>
          <Select name="purchaseOrder" value={form.purchaseOrder} onChange={handleChange} required>
            <option value="">Selecciona</option>
            {orders.map(o => (
              <option key={o._id} value={o._id}>
                {o.code} – {o.supplier.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Almacén</Label>
          <Select name="warehouse" value={form.warehouse} onChange={handleChange} required>
            <option value="">Selecciona</option>
            {warehouses.map(w => (
              <option key={w._id} value={w._id}>{w.name}</option>
            ))}
          </Select>
        </Field>
      </Form>

      <FullWidthField>
        <Label>Ítems recibidos</Label>
        {items.length > 0 && (
          <ItemRow>
            <ItemLabel>Producto</ItemLabel>
            <ItemLabel>Cantidad</ItemLabel>
            <span style={{ width: '80px' }} />
          </ItemRow>
        )}
        <ItemContainer>
          {items.map((it, i) => (
            <ItemRow key={i}>
              <ItemSelect
                value={it.product}
                onChange={e => handleItemChange(i, 'product', e.target.value)}
                required
              >
                <option value="">Producto</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </ItemSelect>
              <ItemInput
                type="number"
                min="1"
                value={it.quantity}
                onChange={e => handleItemChange(i, 'quantity', e.target.value)}
                placeholder="Cantidad"
                required
              />
              <ItemButton className="remove" type="button" onClick={() => removeItem(i)}>
                Eliminar
              </ItemButton>
            </ItemRow>
          ))}
        </ItemContainer>

        <AddItemButtonWrapper>
          <ItemButton type="button" onClick={addItem}>Agregar Ítem</ItemButton>
        </AddItemButtonWrapper>
      </FullWidthField>

      <TopTableControls>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Buscar orden o almacén..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchWrapper>

        <SubmitButton type="button" onClick={handleRegisterClick}>
          Registrar Recepción
        </SubmitButton>
      </TopTableControls>

      <Table>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Almacén</th>
            <th>Fecha</th>
            <th>Recibido por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(r => (
            <tr key={r._id}>
              <td>{r.purchaseOrder.code}</td>
              <td>{r.warehouse.name}</td>
              <td>{new Date(r.receivedDate).toLocaleDateString()}</td>
              <td>{r.receivedBy.name}</td>
              <td>
                <ActionIcon type="delete" onClick={() => confirmDelete(r._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, idx) => (
            <PaginationButton
              key={idx}
              isActive={currentPage === idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
      )}

      <Notification message={notification.message} type={notification.type} />
      {showModal && (
        <Modal
          message="¿Eliminar esta recepción?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </ReceivingWrapper>
  )
}