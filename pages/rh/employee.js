import { useState, useEffect, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Container, Title,
  FormSection, FormGroup,
  SelectUser, TextInput, DateInput, NumberInput,
  SubmitButton, Table, Th, Td,
  PaginationWrapper, EditButton, DeleteButton, 
  SalaryInputWrapper, CurrencySymbol, BottomBar, SearchInput,
  SearchWrapper, CancelButton, SearchIcon
} from '@/styles/rh/employee.styles'

const formatCurrencyInput = (value) => {
  const cleanValue = value.replace(/[^0-9.]/g, '')
  const [integerPart, decimalPart] = cleanValue.split('.')
  const formattedInt = parseInt(integerPart || '0', 10).toLocaleString('en-US')
  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart.slice(0, 2)}`
    : formattedInt
}

export default function EmployeePage() {
  const [users, setUsers] = useState([])
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({
    userId: '', position: '', department: '', hireDate: '', salary: ''
  })
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editing, setEditing] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5
  const [search, setSearch] = useState('')

  const notify = (type, message) => setNotification({ type, message })

  useEffect(() => {
    axiosInstance.get('/user/list/').then(res => setUsers(res.data)).catch(() => notify('error', 'Error al cargar usuarios'))
    fetchEmployees()
  }, [])

  const fetchEmployees = () => {
    axiosInstance.get('/employee/')
      .then(res => {
        const validEmployees = res.data.filter(emp => emp.user)
        setEmployees(validEmployees)
      })
      .catch(() => notify('error', 'Error al cargar empleados'))
  }

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [notification])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'salary') {
      const formatted = formatCurrencyInput(value)
      setForm(f => ({ ...f, salary: formatted }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.userId || !form.position || !form.hireDate || !form.salary)
      return notify('error', 'Completa todos los campos obligatorios')

    const payload = {
      userId: form.userId,
      position: form.position,
      department: form.department,
      hireDate: form.hireDate,
      salary: parseFloat(form.salary.replace(/,/g, ''))
    }

    try {
      if (editing) {
        await axiosInstance.put(`/employee/${editing}`, payload)
        notify('success', 'Perfil actualizado')
      } else {
        await axiosInstance.post('/employee/', payload)
        notify('success', 'Perfil creado')
      }
      setForm({ userId: '', position: '', department: '', hireDate: '', salary: '' })
      setEditing(null)
      setCurrentPage(1)
      fetchEmployees()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error en operación')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await axiosInstance.delete(`/employee/${deleteTarget}`)
      notify('success', 'Perfil eliminado')
      setDeleteTarget(null)
      fetchEmployees()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al eliminar')
    }
  }

  const filteredEmployees = useMemo(() => (
  employees.filter(emp =>
    emp.user?.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase()) ||
    emp.department?.toLowerCase().includes(search.toLowerCase())
    )
  ), [employees, search])

  const paged = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredEmployees, currentPage])

  return (
    <>
      <Notification type={notification.type} message={notification.message} />
      <Container>
        <Title>{editing ? 'Editar Empleado' : 'Nuevo Empleado'}</Title>
        <FormSection onSubmit={handleSubmit}>
          <FormGroup>
            <label>Usuario *</label>
            <SelectUser name="userId" value={form.userId} onChange={handleChange} required>
              <option value="">Selecciona usuario</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name} — {u.email}</option>)}
            </SelectUser>
          </FormGroup>
          <FormGroup><label>Puesto *</label><TextInput name="position" value={form.position} onChange={handleChange} required /></FormGroup>
          <FormGroup><label>Departamento</label><TextInput name="department" value={form.department} onChange={handleChange} /></FormGroup>
          <FormGroup><label>Fecha contratación *</label><DateInput type="date" name="hireDate" value={form.hireDate} onChange={handleChange} required /></FormGroup>
          <FormGroup><label>Salario *</label><SalaryInputWrapper><CurrencySymbol>$</CurrencySymbol><NumberInput name="salary" value={form.salary} onChange={handleChange} required /></SalaryInputWrapper></FormGroup>
          <BottomBar>
            <SearchWrapper>
              <SearchInput
                placeholder="Buscar empleado..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {editing && (
                <CancelButton
                  type="button"
                  onClick={() => {
                    setEditing(null)
                    setForm({ userId: '', position: '', department: '', hireDate: '', salary: '' })
                  }}
                >
                  Cancelar
                </CancelButton>
              )}
              <SubmitButton type="submit">
                {editing ? 'Actualizar' : 'Guardar'}
              </SubmitButton>
            </div>
          </BottomBar>
        </FormSection>

        <Title>Listado de Empleados</Title>
        <Table>
          <thead><tr>
            <Th>Usuario</Th><Th>Puesto</Th><Th>Departamento</Th><Th>Ingreso</Th><Th>Salario</Th><Th>Acciones</Th>
          </tr></thead>
          <tbody>
            {paged.map(emp => (
              <tr key={emp._id}>
                <Td>{emp.user ? emp.user.name : '(usuario eliminado)'}</Td>
                <Td>{emp.position}</Td>
                <Td>{emp.department || '-'}</Td>
                <Td>{new Date(emp.hireDate).toISOString().split('T')[0]}</Td>
                <Td>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(emp.salary)}</Td>
                <Td>
                  {emp.user && (
                    <EditButton edit onClick={() => {
                      setEditing(emp._id)
                      setForm({
                        userId: emp.user._id,
                        position: emp.position,
                        department: emp.department || '',
                        hireDate: emp.hireDate.split('T')[0],
                        salary: new Intl.NumberFormat('en-US').format(emp.salary)
                      })
                    }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </EditButton>
                  )}
                  <DeleteButton red onClick={() => setDeleteTarget(emp._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {employees.length > ITEMS_PER_PAGE && (
          <PaginationWrapper>
            {Array.from({ length: Math.ceil(employees.length / ITEMS_PER_PAGE) }, (_, i) => (
              <button key={i + 1} className={i + 1 === currentPage ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </PaginationWrapper>
        )}

        {deleteTarget && (
          <Modal
            message="¿Seguro que deseas eliminar este perfil?"
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </Container>
    </>
  )
}