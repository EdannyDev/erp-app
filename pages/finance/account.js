import { useEffect, useState, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  Container, Title, Table, Th, Td,
  Form, Input, SearchInput, SearchIcon, SearchWrapper, Select, CheckboxLabel, Checkbox, Button,
  ButtonsContainer, CancelButton,
  Pagination, IconButton
} from '@/styles/finance/account.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function AccountPage() {
  const [accounts, setAccounts] = useState([])
  const [form, setForm] = useState({
    _id: null, code: '', name: '', type: '',
    description: '', parent: '', isGroup: false
  })
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState(null)

  const ITEMS_PER_PAGE = 5

  const fetchAccounts = async () => {
    try {
      const res = await axiosInstance.get('/account/')
      setAccounts(res.data)
    } catch (err) {
      notify('error', 'Error al obtener cuentas')
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(timeout)
    }
  }, [notification.message])

  const notify = (type, message) => setNotification({ type, message })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = { ...form }
    if (!payload.parent) delete payload.parent

    try {
      let res
      if (form._id) {
        res = await axiosInstance.put(`/account/${form._id}`, payload)
        notify('success', res.data.mensaje)
      } else {
        res = await axiosInstance.post('/account/', payload)
        notify('success', res.data.mensaje)
      }
      setForm({ _id: null, code: '', name: '', type: '', description: '', parent: '', isGroup: false })
      fetchAccounts()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al guardar cuenta')
    }
  }

  const handleEdit = acc => {
    setForm({
      _id: acc._id, code: acc.code, name: acc.name,
      type: acc.type, description: acc.description || '',
      parent: acc.parent?._id || '', isGroup: acc.isGroup
    })
  }

  const handleDelete = id => {
    setAccountToDelete(id)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/account/${accountToDelete}`)
      notify('success', res.data.mensaje)
      await fetchAccounts()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al eliminar cuenta')
    } finally {
      setShowModal(false)
      setAccountToDelete(null)
    }
  }

  const filtered = useMemo(() => accounts.filter(acc =>
    acc.code.toLowerCase().includes(search.toLowerCase()) ||
    acc.name.toLowerCase().includes(search.toLowerCase())
  ), [search, accounts])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    if (pageItems.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [pageItems, currentPage])

  return (
    <>
      <Notification message={notification.message} type={notification.type} />

      {showModal && (
        <Modal
          message="¿Estás seguro de que deseas eliminar esta cuenta?"
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowModal(false)
            setAccountToDelete(null)
          }}
        />
      )}

      <Container>
        <Title>Cuentas Contables</Title>
        <SearchWrapper>
          <SearchInput
            placeholder="Buscar cuenta..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <SearchIcon icon={faMagnifyingGlass} />
        </SearchWrapper>

        <Form onSubmit={handleSubmit}>
          <Input name="code" placeholder="Código" value={form.code} onChange={handleChange} required />
          <Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
          <Select name="type" value={form.type} onChange={handleChange} required>
            <option value="">Tipo de cuenta</option>
            {['activo', 'pasivo', 'capital', 'ingreso', 'gasto'].map(t =>
              <option key={t} value={t}>{t}</option>
            )}
          </Select>
          <Input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
          <Select name="parent" value={form.parent} onChange={handleChange}>
            <option value="">Cuenta Padre (opcional)</option>
            {accounts.filter(a => a._id !== form._id).map(acc =>
              <option key={acc._id} value={acc._id}>
                {acc.code} - {acc.name}
              </option>
            )}
          </Select>

          <CheckboxLabel>
            <Checkbox type="checkbox" name="isGroup" checked={form.isGroup} onChange={handleChange} />
            Es un grupo de cuentas
          </CheckboxLabel>

          <ButtonsContainer>
            {form._id && (
              <CancelButton
                type="button"
                onClick={() => setForm({ _id: null, code: '', name: '', type: '', description: '', parent: '', isGroup: false })}
              >
                Cancelar
              </CancelButton>
            )}
            <Button type="submit">{form._id ? 'Actualizar cuenta' : 'Crear cuenta'}</Button>
          </ButtonsContainer>
        </Form>

        <Table>
          <thead>
            <tr>
              <Th>Código</Th><Th>Nombre</Th><Th>Tipo</Th><Th>Descripción</Th><Th>Padre</Th><Th>Grupo</Th><Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(acc => (
              <tr key={acc._id}>
                <Td>{acc.code}</Td>
                <Td>{acc.name}</Td>
                <Td>{acc.type}</Td>
                <Td>{acc.description}</Td>
                <Td>{acc.parent ? `${acc.parent.code} - ${acc.parent.name}` : '—'}</Td>
                <Td>{acc.isGroup ? 'Sí' : 'No'}</Td>
                <Td>
                  <IconButton color="edit" onClick={() => handleEdit(acc)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton color="delete" onClick={() => handleDelete(acc._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={i + 1 === currentPage ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </Pagination>
      </Container>
    </>
  )
}