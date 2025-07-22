import { useEffect, useState } from 'react'
import axios from '@/services/axiosInstance'
import Modal from '@/components/modal'
import {
  Wrapper,
  Header,
  Form,
  Field,
  Label,
  Input,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
  TopBar,
  SearchWrapper,
  SearchInput,
  ActionIcon,
  Table,
  PaginationContainer,
  PaginationButton
} from '@/styles/inventory/warehouse.styles'
import Notification from '@/components/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([])
  const [form, setForm] = useState({ name: '', location: '' })
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [toDelete, setToDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const itemsPerPage = 5

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('/warehouse')
      setWarehouses(res.data)
    } catch {
      showNotification('Error al cargar almacenes', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, location } = form
    if (!name || !location) {
      return showNotification('Todos los campos son obligatorios', 'error')
    }

    try {
      if (editingId) {
        await axios.put(`/warehouse/${editingId}`, {
          name: name.trim(),
          location: location.trim()
        })
        showNotification('Almacén actualizado', 'success')
      } else {
        await axios.post('/warehouse', {
          name: name.trim(),
          location: location.trim()
        })
        showNotification('Almacén creado', 'success')
      }
      setForm({ name: '', location: '' })
      setEditingId(null)
      fetchData()
    } catch (err) {
      showNotification(err.response?.data?.mensaje || 'Error al guardar', 'error')
    }
  }

  const handleEdit = id => {
    const warehouse = warehouses.find(w => w._id === id)
    if (warehouse) {
      setForm({ name: warehouse.name, location: warehouse.location })
      setEditingId(id)
    }
  }

  const handleCancelEdit = () => {
    setForm({ name: '', location: '' })
    setEditingId(null)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/warehouse/${toDelete}`)
      showNotification('Almacén eliminado', 'success')
      fetchData()
    } catch {
      showNotification('Error al eliminar', 'error')
    } finally {
      setShowModal(false)
      setToDelete(null)
    }
  }

  const filtered = warehouses.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.location.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const pageData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Wrapper>
      <Header><h1>Almacenes</h1></Header>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Nombre</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Ubicación</Label>
          <Input name="location" value={form.location} onChange={handleChange} />
        </Field>
      </Form>

      <TopBar>
        <SearchWrapper>
          <SearchInput
            placeholder="Buscar almacén..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchWrapper>

        <ButtonWrapper>
          {editingId && (
            <CancelButton type="button" onClick={handleCancelEdit}>Cancelar</CancelButton>
          )}
          <SubmitButton type="submit" form="form">{editingId ? 'Actualizar' : 'Guardar'}</SubmitButton>
        </ButtonWrapper>
      </TopBar>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(w => (
            <tr key={w._id}>
              <td>{w.name}</td>
              <td>{w.location}</td>
              <td>
                <ActionIcon type="edit" title="Editar" onClick={() => handleEdit(w._id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon type="delete" title="Eliminar" onClick={() => { setToDelete(w._id); setShowModal(true) }}>
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

      {showModal && (
        <Modal
          message="¿Eliminar este almacén?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      <Notification message={notification.message} type={notification.type} />
    </Wrapper>
  )
}