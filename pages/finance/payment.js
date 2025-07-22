import { useEffect, useState, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import { faTrash, faSearch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Container, Title,
  FormSection, FormGroup, FormRow,
  Select, DateInput, TextInput,
  SubmitButton, Table, Th, Td, IconButton,
  PaginationWrapper, BottomBar, SearchInput, SearchIcon, SearchWrapper,
  EditButton, DeleteButton, CancelButton, CurrencyInput, CurrencyInputWrapper,
  PesoIcon
} from '@/styles/finance/payment.styles'

export default function PaymentPage() {
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const ITEMS_PER_PAGE = 5

  const [form, setForm] = useState({
    invoice: '',
    amount: '',
    method: '',
    paymentDate: '',
    paymentNumber: ''
  })

  const notify = (type, message) => setNotification({ type, message })

  useEffect(() => {
    axiosInstance.get('/invoice/')
      .then(res => setInvoices(res.data))
      .catch(() => notify('error', 'Error al cargar facturas'))

    fetchPayments()
  }, [])

  const fetchPayments = () => {
    axiosInstance.get('/payment/')
      .then(res => {
        const data = res.data.map(p => ({
          ...p,
          paymentDate: p.paymentDate ? p.paymentDate.split('T')[0] : ''
        }))
        setPayments(data)
      })
      .catch(() => notify('error', 'Error al cargar pagos'))
  }

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [notification.message])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.invoice || !form.amount || !form.method || !form.paymentNumber)
      return notify('error', 'Todos los campos obligatorios deben estar completos')

    try {
      if (editingId) {
        await axiosInstance.put(`/payment/${editingId}`, {
          ...form,
          amount: parseFloat(form.amount),
          paymentDate: form.paymentDate || new Date().toISOString().split('T')[0]
        })
        notify('success', 'Pago actualizado correctamente')
      } else {
        await axiosInstance.post('/payment/', {
          ...form,
          amount: parseFloat(form.amount),
          paymentDate: form.paymentDate || new Date().toISOString().split('T')[0]
        })
        notify('success', 'Pago registrado correctamente')
      }

      setForm({ invoice: '', amount: '', method: '', paymentDate: '', paymentNumber: '' })
      setEditingId(null)
      setCurrentPage(1)
      fetchPayments()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al guardar pago')
    }
  }

  const handleEdit = (p) => {
    setEditingId(p._id)
    setForm({
      invoice: p.invoice?._id || '',
      amount: p.amount.toString(),
      method: p.method,
      paymentDate: p.paymentDate || '',
      paymentNumber: p.paymentNumber
    })
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/payment/${deleteTarget}`)
      notify('success', 'Pago eliminado correctamente')
      setDeleteTarget(null)
      fetchPayments()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al eliminar pago')
    }
  }

  const filtered = useMemo(() => (
    payments.filter(p =>
      p.paymentNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase())
    )
  ), [payments, search])

  const pagedPayments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, currentPage])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <>
      <Notification type={notification.type} message={notification.message} />

      <Container>
        <Title>Registrar Pago</Title>

        <FormSection onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <label>Factura *</label>
              <Select name="invoice" value={form.invoice} onChange={handleChange} required>
                <option value="">Selecciona una factura</option>
                {invoices.map(inv => (
                  <option key={inv._id} value={inv._id}>
                    #{inv._id.slice(-5)} | Total: {inv.total} | Pagado: {inv.paid}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <label>Monto *</label>
              <CurrencyInputWrapper>
                <PesoIcon>$</PesoIcon>
                <CurrencyInput
                  name="amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={form.amount === '' ? '' : Number(form.amount).toLocaleString('es-MX')}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^\d]/g, '')
                    setForm(f => ({ ...f, amount: raw }))
                  }}
                  required
                />
              </CurrencyInputWrapper>
            </FormGroup>

            <FormGroup>
              <label>Método *</label>
              <Select name="method" value={form.method} onChange={handleChange} required>
                <option value="">Selecciona método</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <label>Fecha</label>
              <DateInput
                name="paymentDate"
                type="date"
                value={form.paymentDate}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Número *</label>
              <TextInput
                name="paymentNumber"
                type="text"
                value={form.paymentNumber}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <BottomBar>
            <SearchWrapper>
              <SearchInput
                placeholder="Buscar pago..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {editingId && (
                <CancelButton
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setForm({ invoice: '', amount: '', method: '', paymentDate: '', paymentNumber: '' })
                  }}
                >
                  Cancelar
                </CancelButton>
              )}
              <SubmitButton type="submit">
                {editingId ? 'Actualizar Pago' : 'Guardar Pago'}
              </SubmitButton>
            </div>
          </BottomBar>
        </FormSection>

        <Title>Historial de Pagos</Title>

        <Table>
          <thead>
            <tr>
              <Th>Factura</Th>
              <Th>Monto</Th>
              <Th>Método</Th>
              <Th>Fecha</Th>
              <Th>Número</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pagedPayments.map(p => (
              <tr key={p._id}>
                <Td>{p.invoice?._id.slice(-5)}</Td>
                <Td>${Number(p.amount).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Td>
                <Td>{p.method}</Td>
                <Td>{p.paymentDate}</Td>
                <Td>{p.paymentNumber}</Td>
                <Td>
                  <EditButton onClick={() => handleEdit(p)} title="Editar">
                    <FontAwesomeIcon icon={faEdit} />
                  </EditButton>
                  <DeleteButton onClick={() => setDeleteTarget(p._id)} title="Eliminar">
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
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
          message="¿Seguro que deseas eliminar este pago?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}