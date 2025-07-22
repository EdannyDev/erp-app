import { useEffect, useState } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Modal from '@/components/modal'
import Notification from '@/components/notification'
import {
  ClientsWrapper,
  Header,
  ClientsTable,
  ClientForm,
  Field,
  Label,
  Input,
  SubmitButton,
  ActionIcon,
  SearchWrapper,
  SearchInput,
  FormActionsRow,
  ButtonGroup,
  CancelButton,
  PaginationContainer,
  PaginationButton
} from '@/styles/sales/client.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ClientsPage() {
  const [clients, setClients] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })
  const [confirmation, setConfirmation] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [editMode, setEditMode] = useState(false)
  const [editingClient, setEditingClient] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const clientsPerPage = 5

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get('/client/')
      setClients(res.data)
    } catch (error) {
      showNotification('Error al obtener clientes', 'error')
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const showNotification = (msg, type = 'success') => {
    setNotification({ message: msg, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode) {
        await axiosInstance.put(`/client/${editingClient._id}`, formData)
        showNotification('Cliente actualizado exitosamente')
      } else {
        await axiosInstance.post('/client/', formData)
        showNotification('Cliente creado exitosamente')
      }
      fetchClients()
      resetForm()
    } catch (error) {
      const message = error.response?.data?.mensaje || 'Error al guardar cliente'
      showNotification(message, 'error')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', address: '' })
    setEditMode(false)
    setEditingClient(null)
  }

  const confirmDelete = (client) => {
    setConfirmation({
      message: `¿Estás seguro de eliminar al cliente ${client.name}?`,
      onConfirm: () => deleteClient(client._id),
      onCancel: () => setConfirmation(null),
    })
  }

  const deleteClient = async (id) => {
    try {
      await axiosInstance.delete(`/client/${id}`)
      showNotification('Cliente eliminado exitosamente')
      fetchClients()
    } catch (error) {
      showNotification('Error al eliminar cliente', 'error')
    } finally {
      setConfirmation(null)
    }
  }

  const startEdit = (client) => {
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    })
    setEditMode(true)
    setEditingClient(client)
  }

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage)
  const indexOfLastClient = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastClient - clientsPerPage
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient)

  return (
    <ClientsWrapper>
      <Header>
        <h1>Clientes</h1>
      </Header>

      <ClientForm onSubmit={handleSubmit}>
        <Field>
          <Label>Nombre</Label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Field>
        <Field>
          <Label>Teléfono</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} required />
        </Field>
        <Field>
          <Label>Dirección</Label>
          <Input name="address" value={formData.address} onChange={handleChange} required />
        </Field>
      </ClientForm>

      <FormActionsRow>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => {
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
            {editMode ? 'Actualizar Cliente' : 'Registrar Cliente'}
          </SubmitButton>
        </ButtonGroup>
      </FormActionsRow>

      <ClientsTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.address}</td>
              <td>
                <ActionIcon type="edit" onClick={() => startEdit(client)} title="Editar">
                    <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon type="delete" onClick={() => confirmDelete(client)} title="Eliminar">
                    <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </ClientsTable>

      <PaginationContainer>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationButton
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>

      {confirmation && <Modal {...confirmation} />}
      {notification.message && <Notification {...notification} />}
    </ClientsWrapper>
  )
}