import { useState, useEffect, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  Container, Title, FormSection,
  FormGroup, TextInput, Select,
  Table, Th, Td,
  SubmitButton, CancelButton,
  ButtonContainer,
  SearchRow, SearchInput, SearchIcon,
  IconButton, PaginationWrapper, SearchWrapper
} from '@/styles/administration/user.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const roles = ['admin', 'employee']

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: '', email: '', role: roles[1] })
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const ITEMS_PER_PAGE = 5
  const notify = (type, message) => setNotification({ type, message })

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [notification.message])

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/user/list')
      setUsers(res.data)
      const totalPages = Math.ceil(res.data.length / ITEMS_PER_PAGE)
      if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages)
      if (totalPages === 0) setCurrentPage(1)
    } catch {
      notify('error', 'Error al cargar usuarios')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!editingId) return notify('error', 'Selecciona un usuario para editar')

    const { name, email, role } = form
    if (!name.trim() || !email.trim()) return notify('error', 'Nombre y correo son obligatorios')

    try {
      await axiosInstance.put(`/user/${editingId}`, { name, email, role })
      notify('success', 'Usuario actualizado correctamente')
      setEditingId(null)
      setForm({ name: '', email: '', role: roles[1] })
      await fetchUsers()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al actualizar usuario')
    }
  }

  const handleEdit = user => {
    setEditingId(user._id)
    setForm({ name: user.name, email: user.email, role: user.role })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setForm({ name: '', email: '', role: roles[1] })
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/${deleteTarget}`)
      notify('success', 'Usuario eliminado correctamente')
      setDeleteTarget(null)
      await fetchUsers()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al eliminar usuario')
      setDeleteTarget(null)
    }
  }

  const filteredUsers = useMemo(() =>
    users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    )
  , [users, search])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages)
    if (totalPages === 0) setCurrentPage(1)
  }, [totalPages])

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredUsers, currentPage])

  return (
    <>
      <Notification message={notification.message} type={notification.type} />

      <Container>
        <Title>Usuarios</Title>

        {editingId && (
          <FormSection onSubmit={handleSubmit} id="user-form">
            <FormGroup>
              <label>Nombre *</label>
              <TextInput name="name" value={form.name} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Correo electrónico *</label>
              <TextInput type="email" name="email" value={form.email} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Rol *</label>
              <Select name="role" value={form.role} onChange={handleChange} required>
                {roles.map(r => (
                  <option key={r} value={r}>
                    {r === 'admin' ? 'Administrador' : 'Empleado'}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormSection>
        )}

        <SearchRow>
          <SearchWrapper>
            <SearchInput
              placeholder="Buscar usuario..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <SearchIcon>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchIcon>
          </SearchWrapper>

          {editingId && (
            <ButtonContainer>
              <CancelButton type="button" onClick={handleCancelEdit}>Cancelar</CancelButton>
              <SubmitButton type="submit" form="user-form">Actualizar</SubmitButton>
            </ButtonContainer>
          )}
        </SearchRow>

        <Table>
          <thead>
            <tr>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Rol</Th>
              <Th>Creado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map(u => (
              <tr key={u._id}>
                <Td>{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>{u.role === 'admin' ? 'Administrador' : 'Empleado'}</Td>
                <Td>{new Date(u.createdAt).toLocaleDateString('es-MX')}</Td>
                <Td>
                  <IconButton onClick={() => handleEdit(u)} title="Editar" type="edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton onClick={() => setDeleteTarget(u._id)} title="Eliminar" type="delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Td>
              </tr>
            ))}
            {pagedUsers.length === 0 && (
              <tr>
                <Td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                  No se encontraron usuarios.
                </Td>
              </tr>
            )}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={i + 1 === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </PaginationWrapper>
        )}
      </Container>

      {deleteTarget && (
        <Modal
          message="¿Seguro que deseas eliminar este usuario?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}