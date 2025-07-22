import { useEffect, useState, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import {
  Container,
  Header,
  ReportTitle,
  ControlsRow,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  SwitchButton,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TotalRow,
  PaginationContainer,
  PageButton,
  TotalsContainer,
} from '@/styles/records/report.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import Notification from '@/components/notification'

export default function ReportsPage() {
  const [tipoReporte, setTipoReporte] = useState('balance')
  const [data, setData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState('')
  const itemsPerPage = 5

  const currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  })

  const fetchData = async () => {
    try {
      setError('')
      const endpoint =
        tipoReporte === 'balance' ? '/report/balance-sheet/' : '/report/income-statement/'
      const response = await axiosInstance.get(endpoint)
      setData(response.data)
      setCurrentPage(1)
    } catch {
      setData(null)
      setError('No hay datos disponibles.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [tipoReporte])

  const secciones = useMemo(() => {
    if (!data) return []

    if (tipoReporte === 'balance') {
      return [
        { title: 'Activo', data: data.activo || [], total: data.totalActivo || 0 },
        { title: 'Pasivo', data: data.pasivo || [], total: data.totalPasivo || 0 },
        { title: 'Capital', data: data.capital || [], total: data.totalCapital || 0 }
      ]
    } else {
      return [
        { title: 'Ingresos', data: data.ingreso || [], total: data.totalIngreso || 0 },
        { title: 'Gastos', data: data.gasto || [], total: data.totalGasto || 0 }
      ]
    }
  }, [data, tipoReporte])

  const filteredData = secciones.flatMap((sec) =>
    sec.data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  const handleSwitch = () => {
    setTipoReporte(tipoReporte === 'balance' ? 'income' : 'balance')
    setCurrentPage(1)
    setSearchTerm('')
  }

  const total =
    tipoReporte === 'balance'
      ? (data?.totalActivo ?? 0) + (data?.totalPasivo ?? 0) + (data?.totalCapital ?? 0)
      : (data?.totalIngreso ?? 0) + (data?.totalGasto ?? 0)

  return (
    <Container>
      <Header>
        <ReportTitle>
          {tipoReporte === 'balance' ? 'Balance General' : 'Estado de Resultados'}
        </ReportTitle>

        <ControlsRow>
          <SearchInputContainer>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput
              placeholder="Buscar reporte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputContainer>

          <SwitchButton onClick={handleSwitch}>
            <FontAwesomeIcon icon={faExchangeAlt} />
            Cambiar reporte
          </SwitchButton>
        </ControlsRow>
      </Header>

      <Notification message={error} type="error" />

      {data && (
        <>
          <Table>
            <thead>
              <tr>
                <TableHeader>Clave</TableHeader>
                <TableHeader>Nombre</TableHeader>
                <TableHeader style={{ textAlign: 'right' }}>Saldo</TableHeader>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>
                    {currencyFormatter.format(item.saldo ?? 0)}
                  </TableCell>
                </TableRow>
              ))}
              <TotalRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell style={{ textAlign: 'right' }}>
                  {currencyFormatter.format(total)}
                </TableCell>
              </TotalRow>
            </tbody>
          </Table>

          {tipoReporte === 'balance' && data && (
            <TotalsContainer>
              <div><strong>Total Activo: </strong>{currencyFormatter.format(data.totalActivo ?? 0)}</div>
              <div><strong>Total Pasivo: </strong>{currencyFormatter.format(data.totalPasivo ?? 0)}</div>
              <div><strong>Total Capital: </strong>{currencyFormatter.format(data.totalCapital ?? 0)}</div>
            </TotalsContainer>
          )}

          {tipoReporte === 'income' && data && (
            <TotalsContainer>
              <div><strong>Total Ingresos: </strong>{currencyFormatter.format(data.totalIngreso ?? 0)}</div>
              <div><strong>Total Gastos: </strong>{currencyFormatter.format(data.totalGasto ?? 0)}</div>
              <div><strong>Utilidad Neta: </strong>{currencyFormatter.format(data.utilidadNeta ?? 0)}</div>
            </TotalsContainer>
          )}

          {totalPages > 1 && (
            <PaginationContainer>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton
                  key={i + 1}
                  onClick={() => handleChangePage(i + 1)}
                  active={currentPage === i + 1}
                >
                  {i + 1}
                </PageButton>
              ))}
            </PaginationContainer>
          )}
        </>
      )}
    </Container>
  )
}