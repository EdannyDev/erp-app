import { useEffect, useState } from 'react'
import {
  DashboardContainer,
  HeaderSection,
  Avatar,
  WelcomeTitle,
  WelcomeMessage,
  RoleLabel,
  DateText,
  QuoteBox
} from '@/styles/dashboard.styles'
import Notification from '@/components/notification'

export default function Dashboard() {
  const [user, setUser] = useState({ name: '', role: '' })
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser) {
      setNotification({ message: 'No hay datos de usuario. Inicia sesión.', type: 'error' })
      return
    }

    setUser({ name: storedUser.name, role: storedUser.role })

    const today = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    setCurrentDate(today.toLocaleDateString('es-MX', options))
  }, [])

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <DashboardContainer>
        <HeaderSection>
          <Avatar>{user.name.charAt(0)}</Avatar>
          <div>
            <WelcomeTitle>¡Bienvenido, {user.name}!</WelcomeTitle>
            <RoleLabel>Rol: {user.role === 'admin' ? 'Administrador' : 'Empleado'}</RoleLabel>
            <DateText>Hoy es {currentDate}</DateText>
          </div>
        </HeaderSection>

        <WelcomeMessage>
          Nos alegra verte de nuevo. Desde este panel podrás gestionar todas las áreas importantes de tu empresa.
        </WelcomeMessage>

        <QuoteBox>
          “La clave del éxito es empezar antes de estar listo.” – Marie Forleo
        </QuoteBox>
      </DashboardContainer>
    </>
  )
}