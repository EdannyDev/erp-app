import { useEffect, useState } from 'react'
import axios from '@/services/axiosInstance'
import Modal from '@/components/modal'
import Notification from '@/components/notification'
import {
  Wrapper,
  Header,
  Form,
  Field,
  Label,
  Input,
  SubmitButton,
  CancelButton,
  Table,
  SearchWrapper,
  SearchInput,
  ActionIcon,
  PaginationContainer,
  PaginationButton,
  ControlsRow
} from '@/styles/inventory/category.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })
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
      const res = await axios.get('/category')
      setCategories(res.data)
    } catch {
      showNotification('Error al cargar categorías', 'error')
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
    const { name, description } = form

    if (!name || !description) {
      return showNotification('Todos los campos son obligatorios', 'error')
    }

    try {
      if (editingId) {
        await axios.put(`/category/${editingId}`, {
          name: name.trim(),
          description: description.trim()
        })
        showNotification('Categoría actualizada', 'success')
      } else {
        await axios.post('/category', {
          name: name.trim(),
          description: description.trim()
        })
        showNotification('Categoría creada', 'success')
      }

      setForm({ name: '', description: '' })
      setEditingId(null)
      fetchData()
    } catch (err) {
      showNotification(err.response?.data?.mensaje || 'Error al guardar categoría', 'error')
    }
  }

  const handleEdit = category => {
    setForm({ name: category.name, description: category.description })
    setEditingId(category._id)
  }

  const handleCancelEdit = () => {
    setForm({ name: '', description: '' })
    setEditingId(null)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/category/${toDelete}`)
      showNotification('Categoría eliminada', 'success')
      fetchData()
    } catch {
      showNotification('Error al eliminar categoría', 'error')
    } finally {
      setShowModal(false)
      setToDelete(null)
    }
  }

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const pageData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Wrapper>
      <Header><h1>Categorías</h1></Header>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Nombre</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Descripción</Label>
          <Input name="description" value={form.description} onChange={handleChange} />
        </Field>
      </Form>

      <ControlsRow>
        <SearchWrapper>
          <SearchInput
            placeholder="Buscar categoría..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchWrapper>

        <div>
          {editingId && (
            <CancelButton type="button" onClick={handleCancelEdit}>Cancelar</CancelButton>
          )}
          <SubmitButton type="submit" form="category-form">
            {editingId ? 'Actualizar' : 'Crear'}
          </SubmitButton>
        </div>
      </ControlsRow>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <ActionIcon
                  type="edit"
                  title="Editar"
                  onClick={() => handleEdit(c)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon
                  type="delete"
                  title="Eliminar"
                  onClick={() => { setToDelete(c._id); setShowModal(true) }}
                >
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
          message="¿Eliminar esta categoría?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      <Notification message={notification.message} type={notification.type} />
    </Wrapper>
  )
}