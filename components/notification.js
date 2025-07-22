import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { NotificationContainer, Icon } from '@/styles/notification.styles'

export default function Notification({ message, type }) {
  if (!message) return null

  const icon = type === 'success' ? faCheckCircle : faExclamationCircle

  return (
    <NotificationContainer type={type}>
      <Icon icon={icon} type={type} />
      {message}
    </NotificationContainer>
  )
}