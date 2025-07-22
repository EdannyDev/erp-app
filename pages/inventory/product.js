import { useEffect, useState } from 'react'
import axios from '@/services/axiosInstance'
import {
  Wrapper,
  Header,
  Form,
  Field,
  Label,
  Input,
  Select,
  SubmitButton,
  Table,
  SearchWrapper,
  SearchInput,
  ActionIcon,
  PaginationContainer,
  PaginationButton,
  RightAlignInput,
  PriceWrapper,
  CurrencySymbol,
  ControlsRow,
  ButtonsWrapper,
  CancelButton
} from '@/styles/inventory/product.styles'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const formatPrice = value => {
  const number = parseFloat(value.toString().replace(/,/g, ''))
  if (isNaN(number)) return ''
  return number.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const unformatPrice = value => {
  return value.replace(/,/g, '')
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    warehouse: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const itemsPerPage = 5

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [pRes, cRes, wRes] = await Promise.all([
        axios.get('/product'),
        axios.get('/category'),
        axios.get('/warehouse')
      ])
      setProducts(pRes.data)
      setCategories(cRes.data)
      setWarehouses(wRes.data)
    } catch {
      showNotification('Error al cargar datos', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'price') {
      const formatted = formatPrice(value)
      setForm(prev => ({ ...prev, [name]: formatted }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, description, price, category, stock, warehouse } = form

    if (!name || !description || !price || !category || !stock || !warehouse) {
      return showNotification('Todos los campos son obligatorios', 'error')
    }

    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(unformatPrice(price)),
        stock: parseInt(stock),
        category,
        warehouse
      }

      if (editingId) {
        await axios.put(`/product/${editingId}`, payload)
        showNotification('Producto actualizado correctamente', 'success')
      } else {
        await axios.post('/product', payload)
        showNotification('Producto creado exitosamente', 'success')
      }

      resetForm()
      fetchData()
    } catch (err) {
      showNotification(err.response?.data?.mensaje || 'Error al guardar producto', 'error')
    }
  }

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', stock: '', warehouse: '' })
    setEditingId(null)
  }

  const handleEdit = product => {
    setEditingId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      price: formatPrice(product.price),
      category: product.category?._id,
      stock: product.stock,
      warehouse: product.warehouse?._id
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/product/${productToDelete}`)
      showNotification('Producto eliminado', 'success')
      fetchData()
    } catch {
      showNotification('Error al eliminar producto', 'error')
    } finally {
      setShowConfirmModal(false)
      setProductToDelete(null)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const pageData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Wrapper>
      <Header><h1>Productos</h1></Header>

      <Form id="product-form" onSubmit={handleSubmit}>
        <Field><Label>Nombre</Label><Input name="name" value={form.name} onChange={handleChange} /></Field>
        <Field><Label>Descripción</Label><Input name="description" value={form.description} onChange={handleChange} /></Field>
        <Field>
          <Label>Precio</Label>
          <PriceWrapper>
            <CurrencySymbol>$</CurrencySymbol>
            <RightAlignInput name="price" value={form.price} onChange={handleChange} />
          </PriceWrapper>
        </Field>
        <Field>
          <Label>Categoría</Label>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="">Selecciona</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </Select>
        </Field>
        <Field>
          <Label>Almacén</Label>
          <Select name="warehouse" value={form.warehouse} onChange={handleChange}>
            <option value="">Selecciona</option>
            {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
          </Select>
        </Field>
        <Field><Label>Stock</Label><Input type="number" name="stock" value={form.stock} onChange={handleChange} /></Field>
      </Form>

      <ControlsRow>
        <SearchWrapper>
          <SearchInput
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchWrapper>

        <ButtonsWrapper>
          {editingId && (
            <CancelButton type="button" onClick={resetForm}>Cancelar</CancelButton>
          )}
          <SubmitButton type="submit" form="product-form">
            {editingId ? 'Actualizar' : 'Crear'}
          </SubmitButton>
        </ButtonsWrapper>
      </ControlsRow>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Almacén</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category?.name || 'Sin categoría'}</td>
              <td>{p.warehouse?.name || 'Sin almacén'}</td>
             <td>${Number(p.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>{p.stock}</td>
              <td>
                <ActionIcon type="edit" onClick={() => handleEdit(p)} title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon type="delete" onClick={() => { setProductToDelete(p._id); setShowConfirmModal(true); }} title="Eliminar">
                  <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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

      {showConfirmModal && (
        <Modal
          message="¿Estás seguro de eliminar este producto?"
          onConfirm={handleDelete}
          onCancel={() => {
            setShowConfirmModal(false)
            setProductToDelete(null)
          }}
        />
      )}
    </Wrapper>
  )
}