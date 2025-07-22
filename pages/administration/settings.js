import { useState, useEffect, useMemo } from 'react'
import axiosInstance from '@/services/axiosInstance'
import Notification from '@/components/notification'
import Modal from '@/components/modal'
import {
  Container, Title,
  Section, SectionTitle,
  FormGroup, TextInput,
  Select, ButtonContainer, SubmitButton,
  Table, Th, Td, Divider,
  IconButton,
  PaginationWrapper,
  TaxButtonContainer,
  TaxFormWrapper
} from '@/styles/administration/settings.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const appliesOptions = [
  { value: 'global', label: 'Global' },
  { value: 'product', label: 'Producto' },
  { value: 'service', label: 'Servicio' }
]

const formatCurrency = (value, decimals = 2) => {
  if (value == null || value === '') return ''
  const num = Number(value)
  if (isNaN(num)) return ''
  return num.toLocaleString('es-MX')
}

const formatNumberInput = (value) => {
  if (value == null || value === '') return ''
  const num = Number(value.toString().replace(/[^0-9]/g, ''))
  if (isNaN(num)) return ''
  return num.toLocaleString('es-MX', { maximumFractionDigits: 0 })
}

export default function ConfigPage() {
  const [config, setConfig] = useState(null)
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taxToDelete, setTaxToDelete] = useState(null)

  const [companyForm, setCompanyForm] = useState({
    name: '', legalName: '', taxId: '', address: '',
    phone: '', email: '', website: '', logoUrl: ''
  })

  const [currencyForm, setCurrencyForm] = useState({
    code: '', symbol: '', decimalSeparator: '.', thousandSeparator: ','
  })

  const [taxes, setTaxes] = useState([])
  const [taxForm, setTaxForm] = useState({ name: '', rate: '', appliesTo: 'global' })
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

  const [notifForm, setNotifForm] = useState({
    emailEnabled: false, smtpHost: '', smtpPort: '', smtpUser: '', smtpPass: ''
  })

  const notify = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: '' }), 3000)
  }

  const fetchConfig = async () => {
    try {
      const res = await axiosInstance.get('/settings/')
      const cfg = res.data.config
      setConfig(cfg)

      setCompanyForm(cfg.company || {
        name: '', legalName: '', taxId: '', address: '',
        phone: '', email: '', website: '', logoUrl: ''
      })

      setCurrencyForm(cfg.currency || {
        code: '', symbol: '', decimalSeparator: '.', thousandSeparator: ','
      })

      setTaxes(cfg.taxes || [])

      setNotifForm(cfg.notifications || {
        emailEnabled: false, smtpHost: '', smtpPort: '', smtpUser: '', smtpPass: ''
      })
    } catch {
      notify('error', 'Error al cargar configuración')
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const handleChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target
    setter(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleCompanySubmit = async (e) => {
    e.preventDefault()
    if (!companyForm.name.trim() || !companyForm.taxId.trim()) {
      return notify('error', 'Nombre y Tax ID de la empresa son obligatorios')
    }
    try {
      await axiosInstance.put('/settings/company/', companyForm)
      notify('success', 'Datos de empresa actualizados')
      await fetchConfig()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al actualizar datos de empresa')
    }
  }

  const handleCurrencySubmit = async (e) => {
    e.preventDefault()
    if (!currencyForm.code.trim() || !currencyForm.symbol.trim()) {
      return notify('error', 'Código y símbolo de moneda son obligatorios')
    }
    try {
      await axiosInstance.put('/settings/currency/', currencyForm)
      notify('success', 'Moneda actualizada')
      await fetchConfig()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al actualizar moneda')
    }
  }

  const handleTaxRateChange = (e) => {
    const { value } = e.target
    const rawValue = value.replace(/[^0-9]/g, '')
    const formatted = formatNumberInput(rawValue)
    setTaxForm(f => ({ ...f, rate: formatted }))
  }

  const getTaxRateNumber = () => {
    if (!taxForm.rate) return NaN
    const clean = taxForm.rate.replace(/,/g, '')
    return Number(clean)
  }

  const handleTaxAdd = async (e) => {
    e.preventDefault()
    const rateNumber = getTaxRateNumber()
    if (!taxForm.name.trim() || isNaN(rateNumber) || rateNumber < 0) {
      return notify('error', 'Nombre y tasa válidos son obligatorios')
    }
    try {
      await axiosInstance.post('/settings/taxes/', {
        name: taxForm.name.trim(),
        rate: rateNumber,
        appliesTo: taxForm.appliesTo
      })
      notify('success', 'Impuesto agregado')
      setTaxForm({ name: '', rate: '', appliesTo: 'global' })
      await fetchConfig()
      setCurrentPage(Math.ceil((taxes.length + 1) / ITEMS_PER_PAGE))
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al agregar impuesto')
    }
  }

  const confirmDeleteTax = (name) => {
    setTaxToDelete(name)
    setShowDeleteModal(true)
  }

  const handleTaxDelete = async () => {
    if (!taxToDelete) return
    try {
      await axiosInstance.delete(`/settings/taxes/${taxToDelete}`)
      notify('success', 'Impuesto eliminado')
      setShowDeleteModal(false)
      setTaxToDelete(null)
      await fetchConfig()
      const newLength = taxes.length - 1
      const totalPages = Math.ceil(newLength / ITEMS_PER_PAGE)
      if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages)
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al eliminar impuesto')
      setShowDeleteModal(false)
      setTaxToDelete(null)
    }
  }

  const handleNotifSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put('/settings/notifications/', notifForm)
      notify('success', 'Configuración de notificaciones actualizada')
      await fetchConfig()
    } catch (err) {
      notify('error', err.response?.data?.mensaje || 'Error al actualizar notificaciones')
    }
  }

  const totalPages = Math.ceil(taxes.length / ITEMS_PER_PAGE)
  const pagedTaxes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return taxes.slice(start, start + ITEMS_PER_PAGE)
  }, [taxes, currentPage])

  return (
    <>
      <Notification message={notification.message} type={notification.type} />

      <Container>
        <Title>Configuraciones</Title>
        <Divider />

        <Section>
          <SectionTitle>Datos de la empresa</SectionTitle>
          <form onSubmit={handleCompanySubmit}>
            <FormGroup>
              <label>Nombre *</label>
              <TextInput
                name="name"
                value={companyForm.name}
                onChange={handleChange(setCompanyForm)}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Razón Social</label>
              <TextInput
                name="legalName"
                value={companyForm.legalName}
                onChange={handleChange(setCompanyForm)}
              />
            </FormGroup>

            <FormGroup>
              <label>Tax ID *</label>
              <TextInput
                name="taxId"
                value={companyForm.taxId}
                onChange={handleChange(setCompanyForm)}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Dirección</label>
              <TextInput
                name="address"
                value={companyForm.address}
                onChange={handleChange(setCompanyForm)}
              />
            </FormGroup>

            <FormGroup>
              <label>Teléfono</label>
              <TextInput
                name="phone"
                value={companyForm.phone}
                onChange={handleChange(setCompanyForm)}
              />
            </FormGroup>

            <FormGroup>
              <label>Correo electrónico</label>
              <TextInput
                name="email"
                value={companyForm.email}
                onChange={handleChange(setCompanyForm)}
                type="email"
              />
            </FormGroup>

            <FormGroup>
              <label>Sitio web</label>
              <TextInput
                name="website"
                value={companyForm.website}
                onChange={handleChange(setCompanyForm)}
              />
            </FormGroup>

            <FormGroup>
              <label>URL del logo</label>
              <TextInput
                name="logoUrl"
                value={companyForm.logoUrl}
                onChange={handleChange(setCompanyForm)}
              />
            </FormGroup>

            <ButtonContainer>
              <SubmitButton type="submit">Guardar datos de empresa</SubmitButton>
            </ButtonContainer>
          </form>
        </Section>

        <Section>
          <SectionTitle>Moneda</SectionTitle>
          <form onSubmit={handleCurrencySubmit}>
            <FormGroup>
              <label>Código *</label>
              <TextInput
                name="code"
                value={currencyForm.code}
                onChange={handleChange(setCurrencyForm)}
                required
                maxLength={3}
                placeholder="Ej. MXN"
              />
            </FormGroup>

            <FormGroup>
              <label>Símbolo *</label>
              <TextInput
                name="symbol"
                value={currencyForm.symbol}
                onChange={handleChange(setCurrencyForm)}
                required
                maxLength={3}
                placeholder="Ej. $"
              />
            </FormGroup>

            <FormGroup>
              <label>Separador decimal</label>
              <Select
                name="decimalSeparator"
                value={currencyForm.decimalSeparator}
                onChange={handleChange(setCurrencyForm)}
              >
                <option value=".">Punto (.)</option>
                <option value=",">Coma (,)</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <label>Separador de miles</label>
              <Select
                name="thousandSeparator"
                value={currencyForm.thousandSeparator}
                onChange={handleChange(setCurrencyForm)}
              >
                <option value=",">Coma (,)</option>
                <option value=".">Punto (.)</option>
                <option value=" ">Espacio</option>
              </Select>
            </FormGroup>

            <ButtonContainer>
              <SubmitButton type="submit">Guardar moneda</SubmitButton>
            </ButtonContainer>
          </form>
        </Section>

        <Section>
            <SectionTitle>Impuestos</SectionTitle>
            <form onSubmit={handleTaxAdd}>
                <TaxFormWrapper>
                <FormGroup>
                    <label>Nombre *</label>
                    <TextInput
                    name="name"
                    value={taxForm.name}
                    onChange={handleChange(setTaxForm)}
                    required
                    placeholder="Ejemplo: IVA"
                    />
                </FormGroup>

                <FormGroup>
                    <label>Tasa (%) *</label>
                    <TextInput
                    name="rate"
                    value={taxForm.rate}
                    onChange={handleTaxRateChange}
                    required
                    placeholder="Ejemplo: 16%"
                    />
                </FormGroup>

                <FormGroup>
                    <label>Aplica a</label>
                    <Select
                    name="appliesTo"
                    value={taxForm.appliesTo}
                    onChange={handleChange(setTaxForm)}
                    >
                    {appliesOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                    </Select>
                </FormGroup>

                <TaxButtonContainer>
                    <SubmitButton type="submit">Agregar</SubmitButton>
                </TaxButtonContainer>
                </TaxFormWrapper>
            </form>

          <Table>
            <thead>
              <tr>
                <Th>Nombre</Th>
                <Th>Tasa (%)</Th>
                <Th>Aplica a</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {pagedTaxes.map(tax => (
                <tr key={tax.name}>
                  <Td>{tax.name}</Td>
                  <Td>{`${formatCurrency(tax.rate)}%`}</Td>
                  <Td>{appliesOptions.find(o => o.value === tax.appliesTo)?.label || tax.appliesTo}</Td>
                  <Td>
                    <IconButton onClick={() => confirmDeleteTax(tax.name)} title="Eliminar" type="delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </Td>
                </tr>
              ))}
              {pagedTaxes.length === 0 && (
                <tr>
                  <Td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                    No hay impuestos registrados.
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
        </Section>

        <Section>
          <SectionTitle>Configuración de Notificaciones</SectionTitle>
          <form onSubmit={handleNotifSubmit}>
            <FormGroup>
              <label>
                <input
                  type="checkbox"
                  name="emailEnabled"
                  checked={notifForm.emailEnabled}
                  onChange={handleChange(setNotifForm)}
                />
                &nbsp; Activar notificaciones por correo
              </label>
            </FormGroup>

            {notifForm.emailEnabled && (
              <>
                <FormGroup>
                  <label>Host SMTP</label>
                  <TextInput
                    name="smtpHost"
                    value={notifForm.smtpHost}
                    onChange={handleChange(setNotifForm)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Puerto SMTP</label>
                  <TextInput
                    name="smtpPort"
                    type="number"
                    min="0"
                    value={notifForm.smtpPort}
                    onChange={handleChange(setNotifForm)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Usuario SMTP</label>
                  <TextInput
                    name="smtpUser"
                    value={notifForm.smtpUser}
                    onChange={handleChange(setNotifForm)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Contraseña SMTP</label>
                  <TextInput
                    name="smtpPass"
                    type="password"
                    value={notifForm.smtpPass}
                    onChange={handleChange(setNotifForm)}
                  />
                </FormGroup>
              </>
            )}

            <ButtonContainer>
              <SubmitButton type="submit">Guardar</SubmitButton>
            </ButtonContainer>
          </form>
        </Section>
      </Container>

      {showDeleteModal && (
        <Modal
          message={`¿Seguro que deseas eliminar el impuesto "${taxToDelete}"?`}
          onConfirm={handleTaxDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}