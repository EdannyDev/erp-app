import { useEffect, useState } from 'react'
import axios from '@/services/axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  OrdersWrapper,
  Header,
  OrderForm,
  Field,
  Label,
  Input,
  Select,
  SubmitButton,
  OrdersTable,
  ActionIcon,
  SearchWrapper,
  SearchInput,
  PaginationContainer,
  PaginationButton,
  ItemButton,
  ItemButtonWrapper,
  ItemRow,
  TopFieldsWrapper,
  RightGroup,
  TotalText,
  SearchAndTableWrapper,
  TopTableControls,
  ButtonGroup,
  CancelButton,
  CurrencyInputWrapper,
  NarrowProductField,
  NarrowSelect,
  FieldQuantity,
  FieldPrice
} from '@/styles/purchase/purchaseOrder.styles'

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ supplier: '', expectedDate: '' })
  const [editingId, setEditingId] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [showModal, setShowModal] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [products, setProducts] = useState([])

  const formatWithCommas = (value) => {
  const num = Number(value);
    if (!num && num !== 0) return '';
    return num.toLocaleString('es-MX');
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/product/')
      setProducts(data)
    } catch {
      showNotification('Error al cargar productos', 'error')
    }
  }

  useEffect(() => {
    fetchOrders()
    fetchSuppliers()
    fetchProducts()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/purchaseOrder/')
      setOrders(data)
    } catch {
      showNotification('Error al cargar órdenes', 'error')
    }
  }

  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get('/supplier/')
      setSuppliers(data)
    } catch {
      showNotification('Error al cargar proveedores', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleItemChange = (idx, field, value) => {
  const updated = [...items]
  if (field === 'unitPrice') {
  updated[idx][field] = parsePrice(value)
    } else if (field === 'quantity') {
      updated[idx][field] = Number(value)
    } else {
      updated[idx][field] = value
    }
    setItems(updated)
  }

  const addItem = () => {
    setItems([...items, { product: '', quantity: 1, unitPrice: '' }])
  }

  const removeItem = idx => {
    setItems(items.filter((_, i) => i !== idx))
  }

  function parsePrice(priceStr) {
  const str = typeof priceStr === 'number'
      ? priceStr.toString()
      : priceStr || ''
    return Number(str.replace(/,/g, '')) || 0
  }

  const calculateTotal = () =>
    items.reduce((sum, it) => sum + it.quantity * parsePrice(it.unitPrice), 0)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!items.length) return showNotification('Agrega al menos un ítem', 'error')
    const normalizedItems = items.map(it => ({
      product: it.product,
      quantity: it.quantity,
      unitPrice: parsePrice(it.unitPrice)
    }))

    const payload = {
      ...form,
      items: normalizedItems,
      totalAmount: calculateTotal()
    }

    try {
      if (editingId) {
        await axios.put(`/purchaseOrder/${editingId}`, payload)
        showNotification('Orden actualizada correctamente', 'success')
      } else {
        await axios.post('/purchaseOrder/', payload)
        showNotification('Orden creada exitosamente', 'success')
      }
      resetForm()
      fetchOrders()
    } catch (err) {
      showNotification(
        err.response?.data?.mensaje || 'Error al guardar orden',
        'error'
      )
    }
  }

  const handleEdit = order => {
    setForm({
      supplier: order.supplier._id,
      expectedDate: order.expectedDate?.slice(0, 10) || ''
    })
    setItems(
      order.items.map(it => ({
        product: typeof it.product === 'object' ? it.product._id : it.product,
        quantity: it.quantity,
        unitPrice: it.unitPrice ? it.unitPrice.toString() : ''
      }))
    )
    setEditingId(order._id)
  }

  const confirmDelete = id => {
    setOrderToDelete(id)
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/purchaseOrder/${orderToDelete}`)
      showNotification('Orden eliminada exitosamente', 'success')
      fetchOrders()
    } catch {
      showNotification('Error al eliminar orden', 'error')
    } finally {
      setShowModal(false)
    }
  }

  const resetForm = () => {
    setForm({ supplier: '', expectedDate: '' })
    setItems([])
    setEditingId(null)
    document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const filtered = orders.filter(o =>
    o.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const pageData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <OrdersWrapper>
      <Header>
        <h1>Órdenes de Compra</h1>
      </Header>

      <OrderForm id="purchase-form" onSubmit={handleSubmit}>
        <TopFieldsWrapper>
          <Field>
            <Label>Proveedor</Label>
            <Select name="supplier" value={form.supplier} onChange={handleChange} required>
              <option value="">Selecciona un proveedor</option>
              {suppliers.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Fecha esperada</Label>
            <Input
              type="date"
              name="expectedDate"
              value={form.expectedDate}
              onChange={handleChange}
            />
          </Field>
        </TopFieldsWrapper>

        <Label>Ítems</Label>

        {items.map((it, i) => (
          <ItemRow key={i}>
            <NarrowProductField>
              <Label>Producto</Label>
              <NarrowSelect
                value={it.product}
                onChange={e => handleItemChange(i, 'product', e.target.value)}
                required
              >
                <option value="">Producto</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </NarrowSelect>
            </NarrowProductField>

            <FieldQuantity>
              <Label>Cantidad</Label>
              <Input
                type="number"
                min="1"
                value={it.quantity}
                onChange={e => handleItemChange(i, 'quantity', e.target.value)}
                placeholder="Cantidad"
                required
              />
            </FieldQuantity>

            <FieldPrice>
              <Label>Precio Unitario</Label>
              <CurrencyInputWrapper>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={formatWithCommas(it.unitPrice)}
                  onChange={e => {
                    const raw = e.target.value.replace(/,/g, '');
                    handleItemChange(i, 'unitPrice', raw);
                  }}
                  placeholder="0"
                  required
                />
              </CurrencyInputWrapper>
            </FieldPrice>

            <ItemButton className="remove" type="button" onClick={() => removeItem(i)}>
              Eliminar
            </ItemButton>
          </ItemRow>
        ))}

        <ItemButtonWrapper>
          <ItemButton type="button" onClick={addItem}>
            Agregar Ítem
          </ItemButton>
        </ItemButtonWrapper>

        <RightGroup>
          <TotalText>
            <strong>Total: </strong>$
            {calculateTotal().toLocaleString('es-MX', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </TotalText>
        </RightGroup>
      </OrderForm>

      <SearchAndTableWrapper>
        <TopTableControls>
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder="Buscar proveedor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </SearchWrapper>

          <ButtonGroup>
            {editingId && (
              <CancelButton type="button" onClick={resetForm}>
                Cancelar
              </CancelButton>
            )}
            <SubmitButton type="submit" form="purchase-form">
              {editingId ? 'Actualizar' : 'Guardar'}
            </SubmitButton>
          </ButtonGroup>
        </TopTableControls>

        <OrdersTable>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Esperada</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(o => (
              <tr key={o._id}>
                <td>{o.supplier.name}</td>
                <td>{o.expectedDate?.slice(0, 10) || '-'}</td>
                <td>{o.status}</td>
                <td>
                  $
                  {o.totalAmount.toLocaleString('es-MX', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td>
                  <ActionIcon type="edit" onClick={() => handleEdit(o)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </ActionIcon>
                  <ActionIcon type="delete" onClick={() => confirmDelete(o._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </OrdersTable>
      </SearchAndTableWrapper>

      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationButton
              key={i}
              isActive={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
      )}

      <Notification message={notification.message} type={notification.type} />

      {showModal && (
        <Modal
          message="¿Estás seguro de eliminar esta orden?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </OrdersWrapper>
  )
}