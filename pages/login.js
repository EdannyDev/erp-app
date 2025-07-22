import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/services/axiosInstance'
import {
  Container,
  Form,
  InputGroup,
  Input,
  Button,
  Title,
  InputIcon,
  TogglePasswordIcon,
  RedirectText,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalInputGroup,
  ModalInput,
  ModalButton,
  ModalCloseIcon,
  TempPasswordText
} from '@/styles/login.styles'
import Notification from '@/components/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEye, faEyeSlash, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [showModal, setShowModal] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [tempPasswordAdmin, setTempPasswordAdmin] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotification({ message: '', type: '' })

    try {
      const res = await axios.post('/user/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      if (res.data.mensaje) {
        setNotification({ message: res.data.mensaje, type: 'success' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        setNotification({ message: 'Inicio de sesión exitoso', type: 'success' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      }
    } catch (err) {
      setNotification({
        message: err.response?.data?.mensaje || 'Error al iniciar sesión',
        type: 'error'
      })
    }
  }

  const handleRecoverySubmit = async () => {
    setNotification({ message: '', type: '' })
    setTempPasswordAdmin('')

    if (!recoveryEmail.trim()) {
      setNotification({ message: 'Por favor ingresa un correo válido.', type: 'error' })
      return
    }

    try {
      const res = await axios.post('/user/forgot-password', { email: recoveryEmail.trim() })
      if (res.data.tempPassword) {
        setTempPasswordAdmin(res.data.tempPassword)
      } else {
        setShowModal(false)
        setRecoveryEmail('')
      }
      setNotification({ message: res.data.mensaje, type: 'success' })

      setTimeout(() => setNotification({ message: '', type: '' }), 3000)
    } catch (err) {
      setNotification({
        message: err.response?.data?.mensaje || 'Error al recuperar la contraseña',
        type: 'error'
      })
      setTimeout(() => setNotification({ message: '', type: '' }), 3000)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setRecoveryEmail('')
    setTempPasswordAdmin('')
  }

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Iniciar Sesión</Title>

          <InputGroup>
            <InputIcon icon={faEnvelope} />
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon icon={faLock} />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            <TogglePasswordIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputGroup>
          <Button type="submit">Entrar</Button>

          <RedirectText>
            ¿Olvidaste tu contraseña?{' '}
            <span onClick={() => setShowModal(true)}>Restablecer</span>
          </RedirectText>

          <RedirectText>
            ¿No tienes cuenta?{' '}
            <span onClick={() => router.push('/register')}>Regístrate</span>
          </RedirectText>
        </Form>
      </Container>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseIcon icon={faTimes} onClick={closeModal} title="Cerrar" />
            <ModalTitle>Recuperar contraseña</ModalTitle>

            <ModalInputGroup>
              <InputIcon icon={faEnvelope} />
              <ModalInput
                type="email"
                placeholder="Ingresa tu correo"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                autoFocus
              />
            </ModalInputGroup>

            <ModalButton onClick={handleRecoverySubmit}>
              <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '8px' }} />
              Enviar
            </ModalButton>

            {tempPasswordAdmin && (
              <TempPasswordText>
                Contraseña temporal: <strong>{tempPasswordAdmin}</strong>
              </TempPasswordText>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  )
}