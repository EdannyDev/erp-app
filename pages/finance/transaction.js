import { useState, useEffect, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import {
  Container, Title,
  FormSection, FormGroup, DateInput, Textarea,
  Table, Th, Td, LineButton,
  Select,
  AddLineButton, SubmitButton, PaginationWrapper, IconButton,
  BottomBar, SearchWrapper, SearchInput, SearchIcon,
  CurrencyInputWrapper, PesoIcon, CurrencyInput
} from '@/styles/finance/transaction.styles'
import Modal from '@/components/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function TransactionPage() {
  const [accounts, setAccounts] = useState([])
  const [transaction, setTransaction] = useState({
    date: '',
    description: '',
    lines: [{ account: '', debit: '', credit: '' }]
  })
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [search, setSearch] = useState('')

  const ITEMS_PER_PAGE = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [history, setHistory] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openDeleteModal = id => setDeleteTarget(id)
  const closeDeleteModal = () => setDeleteTarget(null)

  const notify = (type, msg) => setNotification({ type, message: msg })

  useEffect(() => {
    axiosInstance.get('/account/')
      .then(res => setAccounts(res.data))
      .catch(() => notify('error', 'Error al cargar cuentas'))
  }, [])

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ type: '', message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [notification.message])

  const handleField = (e) => {
    const { name, value } = e.target
    setTransaction(tx => ({ ...tx, [name]: value }))
  }

  const handleLine = (idx, field, val) => {
    setTransaction(tx => {
      const lines = [...tx.lines]
      if (field === 'debit') {
        lines[idx].debit = val === '' ? '' : Math.max(0, Number(val))
        lines[idx].credit = ''
      } else if (field === 'credit') {
        lines[idx].credit = val === '' ? '' : Math.max(0, Number(val))
        lines[idx].debit = ''
      } else if (field === 'account') {
        lines[idx].account = val
      }
      return { ...tx, lines }
    })
  }

  const addLine = () =>
    setTransaction(tx => ({
      ...tx,
      lines: [...tx.lines, { account: '', debit: '', credit: '' }]
    }))

  const removeLine = idx =>
    setTransaction(tx => ({
      ...tx,
      lines: tx.lines.filter((_, i) => i !== idx)
    }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { date, description, lines } = transaction

    const normalizedLines = lines.map(line => ({
      account: line.account,
      debit: Number(line.debit) || 0,
      credit: Number(line.credit) || 0
    }))

    const totalDebit = normalizedLines.reduce((a, l) => a + l.debit, 0)
    const totalCredit = normalizedLines.reduce((a, l) => a + l.credit, 0)

    if (!description.trim()) return notify('error', 'Descripción requerida')
    if (lines.length < 2) return notify('error', 'Mínimo dos líneas contables')

    for (let i = 0; i < normalizedLines.length; i++) {
      const { account, debit, credit } = normalizedLines[i]
      if (!account) return notify('error', `Línea ${i + 1}: falta cuenta`)
      if ((debit > 0 && credit > 0) || (debit === 0 && credit === 0))
        return notify('error', `Línea ${i + 1}: debe elegir débito o crédito`)
    }

    if (totalDebit !== totalCredit)
      return notify('error', `No cuadrada (D ${totalDebit} ≠ C ${totalCredit})`)

    try {
      await axiosInstance.post('/transaction/', {
        date: date || new Date().toISOString().split('T')[0],
        description: description.trim(),
        lines: normalizedLines
      })
      notify('success', 'Transacción registrada')
      setTransaction({ date: '', description: '', lines: [{ account: '', debit: '', credit: '' }] })
      setCurrentPage(1)
      fetchHistory()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al registrar')
    }
  }

  const fetchHistory = () => {
    axiosInstance.get('/transaction/')
      .then(res => {
        const data = res.data.map(tx => ({
          ...tx,
          date: tx.date ? tx.date.split('T')[0] : ''
        }))
        setHistory(data)
        const totalItems = data.length
        const lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE)
        if (currentPage > lastPage) {
          setCurrentPage(lastPage > 0 ? lastPage : 1)
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const pagedHistory = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return history
      .filter(tx => tx.description.toLowerCase().includes(search.toLowerCase()))
      .slice(start, start + ITEMS_PER_PAGE)
  }, [history, currentPage, search])

  const totalPages = Math.ceil(
    history.filter(tx => tx.description.toLowerCase().includes(search.toLowerCase())).length /
    ITEMS_PER_PAGE
  )

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/transaction/${deleteTarget}`)
      notify('success', 'Transacción eliminada correctamente')
      setDeleteTarget(null)
      fetchHistory()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al eliminar transacción')
      setDeleteTarget(null)
    }
  }

  return (
    <>
      <Notification message={notification.message} type={notification.type} />

      <Container>
        <Title>Transacciones</Title>

        <FormSection id="form-transaction" onSubmit={handleSubmit}>
          <FormGroup>
            <label>Fecha</label>
            <DateInput
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleField}
            />
          </FormGroup>
          <FormGroup>
            <label>Descripción *</label>
            <Textarea
              name="description"
              rows={2}
              value={transaction.description}
              onChange={handleField}
              required
            />
          </FormGroup>

          {transaction.lines.map((ln, i) => (
            <FormGroup key={i}>
              <label>Línea {i + 1}</label>
              <Select
                value={ln.account || ''}
                onChange={e => handleLine(i, 'account', e.target.value)}
                required
              >
                <option value="">Seleccione cuenta</option>
                {accounts.map(a => (
                  <option key={a._id} value={a._id}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </Select>
              <CurrencyInputWrapper>
                <PesoIcon>$</PesoIcon>
                <CurrencyInput
                  type="text"
                  inputMode="numeric"
                  placeholder="Débito"
                  value={ln.debit === '' ? '' : ln.debit.toLocaleString('es-MX')}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^\d]/g, '')
                    handleLine(i, 'debit', raw)
                  }}
                />
              </CurrencyInputWrapper>

              <CurrencyInputWrapper>
                <PesoIcon>$</PesoIcon>
                <CurrencyInput
                  type="text"
                  inputMode="numeric"
                  placeholder="Crédito"
                  value={ln.credit === '' ? '' : ln.credit.toLocaleString('es-MX')}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^\d]/g, '')
                    handleLine(i, 'credit', raw)
                  }}
                />
              </CurrencyInputWrapper>
              <LineButton type="button" onClick={() => removeLine(i)}>Eliminar línea</LineButton>
            </FormGroup>
          ))}

          <AddLineButton type="button" onClick={addLine}>+ Agregar línea</AddLineButton>
        </FormSection>

        <BottomBar>
          <SearchWrapper>
            <SearchInput
              placeholder="Buscar descripción..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <SearchIcon icon={faSearch} />
          </SearchWrapper>
          <SubmitButton type="submit" form="form-transaction">Guardar transacción</SubmitButton>
        </BottomBar>

        <Title>Historial de Transacciones</Title>
        <Table>
          <thead>
            <tr>
              <Th>Fecha</Th><Th>Descripción</Th><Th>Débito</Th><Th>Crédito</Th><Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pagedHistory.map(tx => (
              <tr key={tx._id}>
                <Td>{tx.date}</Td>
                <Td>{tx.description}</Td>
                <Td>
                  ${tx.lines.reduce((s, l) => s + (l.debit || 0), 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Td>
                <Td>
                  ${tx.lines.reduce((s, l) => s + (l.credit || 0), 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Td>
                <Td>
                  <IconButton type="button" onClick={() => openDeleteModal(tx._id)} title="Eliminar">
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Td>
              </tr>
            ))}
            {deleteTarget && (
              <Modal
                message="¿Seguro que deseas eliminar esta transacción?"
                onConfirm={handleDeleteConfirm}
                onCancel={closeDeleteModal}
              />
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
    </>
  )
}