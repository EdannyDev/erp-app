import { useEffect, useState } from 'react'
import axios from '@/services/axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  SuppliersWrapper,
  Header,
  SupplierForm,
  Field,
  Label,
  TextInput,
  SubmitButton,
  SuppliersTable,
  ActionIcon,
  SearchWrapper,
  SearchInput,
  PaginationContainer,
  PaginationButton,
  TopControls,
  BotonesWrapper,
  CancelButton
} from '@/styles/purchase/supplier.styles'

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    rfc: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [showModal, setShowModal] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get('/supplier/')
      setSuppliers(data)
    } catch {
      showNotification('Error al cargar proveedores', 'error')
    }
  }

  const showNotification = (msg, type) => {
    setNotification({ message: msg, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`/supplier/${editingId}`, form)
        showNotification('Proveedor actualizado exitosamente', 'success')
      } else {
        await axios.post('/supplier/', form)
        showNotification('Proveedor creado exitosamente', 'success')
      }
      setForm({
        name: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        rfc: ''
      })
      setEditingId(null)
      fetchSuppliers()
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al guardar proveedor'
      showNotification(msg, 'error')
    }
  }

  const handleEdit = supplier => {
    setForm(supplier)
    setEditingId(supplier._id)
  }

  const confirmDelete = id => {
    setSupplierToDelete(id)
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/supplier/${supplierToDelete}`)
      showNotification('Proveedor eliminado correctamente', 'success')
      fetchSuppliers()
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al eliminar proveedor'
      showNotification(msg, 'error')
    } finally {
      setShowModal(false)
      setSupplierToDelete(null)
    }
  }

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage)
  const currentData = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <SuppliersWrapper>
      <Header>
        <h1>Proveedores</h1>
      </Header>

      <SupplierForm onSubmit={handleSubmit}>
        {[
          { name: 'name', label: 'Nombre' },
          { name: 'contactName', label: 'Nombre de contacto' },
          { name: 'email', label: 'Correo electrónico' },
          { name: 'phone', label: 'Teléfono' },
          { name: 'address', label: 'Dirección' },
          { name: 'rfc', label: 'RFC' }
        ].map(({ name, label }) => (
          <Field key={name}>
            <Label>{label}</Label>
            <TextInput
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
            />
          </Field>
        ))}
      </SupplierForm>

      <TopControls>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Buscar proveedor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchWrapper>

        <BotonesWrapper>
          {editingId && (
            <CancelButton
              type="button"
              onClick={() => {
                setForm({
                  name: '',
                  contactName: '',
                  email: '',
                  phone: '',
                  address: '',
                  rfc: ''
                })
                setEditingId(null)
              }}
            >
              Cancelar
            </CancelButton>
          )}
          <SubmitButton onClick={handleSubmit} type="button">
            {editingId ? 'Actualizar' : 'Guardar'}
          </SubmitButton>
        </BotonesWrapper>
      </TopControls>

      <SuppliersTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>RFC</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.contactName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.address}</td>
              <td>{s.rfc}</td>
              <td>
                <ActionIcon type="edit" onClick={() => handleEdit(s)}>
                  <FontAwesomeIcon icon={faEdit} />
                </ActionIcon>
                <ActionIcon type="delete" onClick={() => confirmDelete(s._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </SuppliersTable>

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
          message="¿Estás seguro de eliminar este proveedor?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </SuppliersWrapper>
  )
}