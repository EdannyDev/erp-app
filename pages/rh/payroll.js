import { useEffect, useState, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  Container,
  Title,
  FormSection,
  FormGroup,
  Select,
  DateInput,
  Textarea,
  SubmitButton,
  Table,
  Th,
  Td,
  IconButton,
  EditButton,
  PaginationWrapper,
  PayButton,
  NoPayButton,
  ActionsBar,
  SearchIcon,
  SearchInput,
  SearchWrapper,
  ButtonGroup,
  CancelButton,
  CurrencyInputWrapper,
  CurrencyNumberInput,
  CurrencySymbol
} from '@/styles/rh/payroll.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheckCircle, faEdit, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons'

const formatCurrencyInput = (value) => {
  if (!value) return ''
  const cleanValue = value.replace(/[^0-9.]/g, '')
  if (cleanValue === '') return ''

  const parsed = parseFloat(cleanValue)
  if (isNaN(parsed)) return ''
  return parsed.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

const parseCurrency = (formattedValue) => {
  if (!formattedValue) return ''
  const cleanValue = formattedValue.replace(/[^0-9.]/g, '')
  return cleanValue
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState([])
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({
    employeeId: '',
    periodStart: '',
    periodEnd: '',
    baseSalary: '',
    bonus: '',
    deductions: '',
    notes: ''
  })

  const ITEMS_PER_PAGE = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const notify = (type, message) => setNotification({ type, message })

  useEffect(() => {
    axiosInstance.get('/employee/')
      .then(res => setEmployees(res.data))
      .catch(() => notify('error', 'Error al cargar empleados'))
  }, [])

  const fetchRecords = () => {
    axiosInstance.get('/payroll/list/')
      .then(res => {
        setRecords(res.data)
        const totalPages = Math.ceil(res.data.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) setCurrentPage(totalPages > 0 ? totalPages : 1)
      })
      .catch(() => notify('error', 'Error al cargar nóminas'))
  }

  useEffect(() => { fetchRecords() }, [])

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [notification.message])

  const handleChange = e => {
    const { name, value } = e.target

    if (['baseSalary', 'bonus', 'deductions'].includes(name)) {
      const numericValue = parseCurrency(value)
      setForm(f => ({ ...f, [name]: numericValue }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const calculateTotalPay = () => {
    const base = parseFloat(form.baseSalary) || 0
    const bonus = parseFloat(form.bonus) || 0
    const deductions = parseFloat(form.deductions) || 0
    return base + bonus - deductions
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { employeeId, periodStart, periodEnd, baseSalary } = form
    if (!employeeId || !periodStart || !periodEnd || !baseSalary) {
      return notify('error', 'Completa todos los campos obligatorios')
    }

    const totalPay = calculateTotalPay()

    try {
      if (editTarget) {
        await axiosInstance.put(`/payroll/${editTarget}`, {
          bonus: parseFloat(form.bonus) || 0,
          deductions: parseFloat(form.deductions) || 0,
          notes: form.notes,
        })
        notify('success', 'Nómina actualizada correctamente')
      } else {
        await axiosInstance.post('/payroll/', {
          employeeId,
          periodStart: form.periodStart,
          periodEnd: form.periodEnd,
          baseSalary: parseFloat(baseSalary),
          bonus: parseFloat(form.bonus) || 0,
          deductions: parseFloat(form.deductions) || 0,
          totalPay,
          notes: form.notes
        })
        notify('success', 'Nómina registrada exitosamente')
      }
      setForm({
        employeeId: '', periodStart: '', periodEnd: '',
        baseSalary: '', bonus: '', deductions: '', notes: ''
      })
      setEditTarget(null)
      fetchRecords()
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Error al guardar nómina'
      notify('error', msg)
    }
  }

  const toDateInputValue = (dateStr) => {
    if (!dateStr) return ''
    return dateStr.split('T')[0]
  }

  const handleEdit = record => {
    setEditTarget(record._id)
    setForm({
      employeeId: record.employee._id,
      periodStart: toDateInputValue(record.periodStart),
      periodEnd: toDateInputValue(record.periodEnd),
      baseSalary: record.baseSalary.toString(),
      bonus: record.bonus.toString(),
      deductions: record.deductions.toString(),
      notes: record.notes || ''
    })
  }

  const cancelEdit = () => {
    setEditTarget(null)
    setForm({
      employeeId: '', periodStart: '', periodEnd: '',
      baseSalary: '', bonus: '', deductions: '', notes: ''
    })
  }

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/payroll/${deleteTarget}`)
      notify('success', 'Nómina eliminada correctamente')
      setDeleteTarget(null)
      fetchRecords()
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Error al eliminar nómina'
      notify('error', msg)
      setDeleteTarget(null)
    }
  }

  const pagedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return records.slice(start, start + ITEMS_PER_PAGE)
  }, [records, currentPage])

  const totalPages = Math.ceil(records.length / ITEMS_PER_PAGE)

  const formatCurrency = n =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(n)

  const formatNumber = n =>
    new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(n)

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return dateStr.split('T')[0].split('-').reverse().join('-')
  }

  const handleMarkAsPaid = async (id) => {
    try {
      const now = new Date()
      const timeZone = 'America/Cancun'
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      const [year, month, day] = formatter.format(now).split('-')
      const localMidnight = new Date(`${year}-${month}-${day}T00:00:00-05:00`)
      await axiosInstance.put(`/payroll/${id}`, {
        paidAt: localMidnight.toISOString()
      })
      notify('success', 'Nómina marcada como pagada')
      fetchRecords()
    } catch (err) {
      notify('error', 'Error al marcar como pagada')
    }
  }

  const handleUnmarkAsPaid = async (id) => {
    try {
      await axiosInstance.put(`/payroll/${id}`, { paidAt: null })
      notify('success', 'Pago de nómina desmarcado correctamente')
      fetchRecords()
    } catch (err) {
      notify('error', 'Error al desmarcar el pago')
    }
  }

  return (
    <>
      <Notification type={notification.type} message={notification.message} />

      <Container>
        <Title>{editTarget ? 'Editar Nómina' : 'Registrar Nómina'}</Title>

        <FormSection onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="employeeId">Empleado *</label>
            <Select
              id="employeeId"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              disabled={!!editTarget}
              required
            >
              <option value="">Selecciona un empleado</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Sin nombre'} ({emp.user?.email || 'Sin email'})
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="periodStart">Inicio del período *</label>
            <DateInput
              id="periodStart"
              type="date"
              name="periodStart"
              value={form.periodStart}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="periodEnd">Fin del período *</label>
            <DateInput
              id="periodEnd"
              type="date"
              name="periodEnd"
              value={form.periodEnd}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="baseSalary">Salario base *</label>
            <CurrencyInputWrapper>
              <CurrencySymbol>$</CurrencySymbol>
              <CurrencyNumberInput
                id="baseSalary"
                name="baseSalary"
                type="text"
                value={formatCurrencyInput(form.baseSalary)}
                onChange={(e) =>
                  setForm(f => ({ ...f, baseSalary: parseCurrency(e.target.value) }))
                }
                required
              />
            </CurrencyInputWrapper>
          </FormGroup>

          <FormGroup>
            <label htmlFor="bonus">Bonos</label>
            <CurrencyInputWrapper>
              <CurrencySymbol>$</CurrencySymbol>
              <CurrencyNumberInput
              id="bonus"
              name="bonus"
              type="text"
              value={formatCurrencyInput(form.bonus)}
              onChange={handleChange}
              />
            </CurrencyInputWrapper>
          </FormGroup>

          <FormGroup>
            <label htmlFor="deductions">Deducciones</label>
            <CurrencyInputWrapper>
              <CurrencySymbol>$</CurrencySymbol>
              <CurrencyNumberInput
              id="deductions"
              name="deductions"
              type="text"
              value={formatCurrencyInput(form.deductions)}
              onChange={handleChange}
              />
            </CurrencyInputWrapper>
          </FormGroup>

          <FormGroup>
            <label htmlFor="notes">Notas</label>
            <Textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
            />
          </FormGroup>

          <FormGroup>
            <label>Total a pagar</label>
            <CurrencyInputWrapper>
              <CurrencySymbol>$</CurrencySymbol>
              <CurrencyNumberInput
                type="text"
                value={formatNumber(calculateTotalPay())}
                readOnly
                disabled
              />
            </CurrencyInputWrapper>  
          </FormGroup>

          <ActionsBar>
            <SearchWrapper>
              <SearchInput
                placeholder="Buscar nómina..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>

            <ButtonGroup>
              {editTarget && (
                <CancelButton type="button" onClick={cancelEdit}>
                  Cancelar
                </CancelButton>
              )}
              <SubmitButton type="submit">
                {editTarget ? 'Actualizar' : 'Guardar'}
              </SubmitButton>
            </ButtonGroup>
          </ActionsBar>
        </FormSection>

        <Title>Historial de Nóminas</Title>

        <Table>
          <thead>
            <tr>
              <Th>Empleado</Th>
              <Th>Período</Th>
              <Th>Total</Th>
              <Th>Pagado</Th>
              <Th>Notas</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pagedRecords.map(record => (
              <tr key={record._id}>
                <Td>{record.employee?.user?.name || 'Sin nombre'}</Td>
                <Td>{formatDate(record.periodStart)} al {formatDate(record.periodEnd)}</Td>
                <Td>{formatCurrency(record.totalPay)}</Td>
                <Td>{record.paidAt ? formatDate(record.paidAt) : 'No pagado'}</Td>
                <Td>{record.notes || '-'}</Td>
                <Td>
                  <EditButton onClick={() => handleEdit(record)} title="Editar">
                    <FontAwesomeIcon icon={faEdit} />
                  </EditButton>
                  <IconButton onClick={() => setDeleteTarget(record._id)} title="Eliminar">
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                  {!record.paidAt ? (
                    <PayButton onClick={() => handleMarkAsPaid(record._id)} title="Pagado">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </PayButton>
                  ) : (
                    <NoPayButton onClick={() => handleUnmarkAsPaid(record._id)} title="No Pagado">
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </NoPayButton>
                  )}
                </Td>
              </tr>
            ))}
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
          message="¿Seguro que deseas eliminar esta nómina?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}