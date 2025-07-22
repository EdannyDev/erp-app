import { useEffect, useState, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  Container, Title,
  FormSection, FormGroup,
  Select, DateInput, Textarea,
  SubmitButton, Table, Th, Td,
  IconButton, EditButton, PaginationWrapper,
  SearchIcon, SearchWrapper, SearchInput,
  CancelButton, ActionsBar, ButtonGroup
} from '@/styles/rh/attendance.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function AttendancePage() {
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState([])
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({
    employeeId: '',
    date: '',
    status: '',
    comment: ''
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
    axiosInstance.get('/attendance/list/')
      .then(res => {
        setRecords(res.data)
        const totalPages = Math.ceil(res.data.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages) setCurrentPage(totalPages > 0 ? totalPages : 1)
      })
      .catch(() => notify('error', 'Error al cargar registros de asistencia'))
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [notification.message])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { employeeId, date, status, comment } = form

    if (!employeeId) return notify('error', 'Selecciona un empleado')
    if (!date) return notify('error', 'Selecciona una fecha')
    if (!status) return notify('error', 'Selecciona un estado')

    try {
      if (editTarget) {
        await axiosInstance.put(`/attendance/${editTarget}`, { status, comment })
        notify('success', 'Asistencia actualizada correctamente')
      } else {
        await axiosInstance.post('/attendance/', { employeeId, date, status, comment })
        notify('success', 'Asistencia registrada exitosamente')
      }

      setForm({ employeeId: '', date: '', status: '', comment: '' })
      setEditTarget(null)
      fetchRecords()
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Error al guardar asistencia'
      notify('error', msg)
    }
  }

  const handleEdit = (record) => {
    const localDateTime = new Date(record.date)
    const tzOffset = localDateTime.getTimezoneOffset() * 60000
    const localISO = new Date(localDateTime.getTime() - tzOffset).toISOString().slice(0, 16)

    setEditTarget(record._id)
    setForm({
      employeeId: record.employee._id,
      date: localISO,
      status: record.status,
      comment: record.comment || ''
    })
  }

  const cancelEdit = () => {
    setEditTarget(null)
    setForm({ employeeId: '', date: '', status: '', comment: '' })
  }

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/attendance/${deleteTarget}`)
      notify('success', 'Registro de asistencia eliminado correctamente')
      setDeleteTarget(null)
      fetchRecords()
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Error al eliminar registro'
      notify('error', msg)
      setDeleteTarget(null)
    }
  }

  const filteredRecords = useMemo(() => {
  return records.filter(r =>
    r.employee?.user?.name?.toLowerCase().includes(search.toLowerCase())
  )
  }, [records, search])

  const pagedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredRecords, currentPage])

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE)

  return (
    <>
      <Notification type={notification.type} message={notification.message} />

      <Container>
        <Title>{editTarget ? 'Editar Asistencia' : 'Registrar Asistencia'}</Title>

        <FormSection onSubmit={handleSubmit}>
          <FormGroup>
            <label>Empleado *</label>
            <Select name="employeeId" value={form.employeeId} onChange={handleChange} disabled={!!editTarget} required>
              <option value="">Selecciona un empleado</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Sin nombre'} ({emp.user?.email || 'Sin email'})
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <label>Fecha y Hora *</label>
            <DateInput
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              disabled={!!editTarget}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Estado *</label>
            <Select name="status" value={form.status} onChange={handleChange} required>
              <option value="">Selecciona un estado</option>
              <option value="presente">Presente</option>
              <option value="ausente">Ausente</option>
              <option value="tarde">Tarde</option>
              <option value="permiso">Permiso</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <label>Comentario</label>
            <Textarea name="comment" value={form.comment} onChange={handleChange} rows={3} />
          </FormGroup>

          <ActionsBar>
            <SearchWrapper>
              <SearchInput
                placeholder="Buscar asistencia..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>

            <ButtonGroup>
              {editTarget ? (
                <>
                  <CancelButton
                    type="button"
                    onClick={cancelEdit}
                  >
                    Cancelar
                  </CancelButton>
                  <SubmitButton type="submit">Actualizar</SubmitButton>
                </>
              ) : (
                <SubmitButton type="submit">Guardar</SubmitButton>
              )}
            </ButtonGroup>
          </ActionsBar>
        </FormSection>

        <Title>Historial de Asistencias</Title>

        <Table>
          <thead>
            <tr>
              <Th>Empleado</Th>
              <Th>Fecha</Th>
              <Th>Estado</Th>
              <Th>Comentario</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pagedRecords.map(record => (
              <tr key={record._id}>
                <Td>{record.employee?.user?.name || 'Sin nombre'}</Td>
                <Td>
                  {new Date(record.date).toLocaleString('es-MX', {
                    timeZone: 'America/Cancun',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Td>
                <Td>{record.status}</Td>
                <Td>{record.comment || '-'}</Td>
                <Td>
                  <EditButton onClick={() => handleEdit(record)} title="Editar">
                    <FontAwesomeIcon icon={faEdit} />
                  </EditButton>
                  <IconButton onClick={() => setDeleteTarget(record._id)} title="Eliminar">
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
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
          message="¿Seguro que deseas eliminar este registro de asistencia?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}