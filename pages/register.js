import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/services/axiosInstance'
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Form,
  InputGroup,
  Input,
  Button,
  Title,
  InputIcon,
  TogglePasswordIcon,
  RedirectText
} from '@/styles/register.styles'
import Notification from '@/components/notification'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotification({ message: '', type: '' })

    try {
      await axios.post('/user/register', form)
      setNotification({
        message: 'Registro exitoso, redirigiendo...',
        type: 'success'
      })
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setNotification({
        message: err.response?.data?.mensaje || 'Error al registrar',
        type: 'error'
      })
    }
  }

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Crear Cuenta</Title>

          <InputGroup>
            <InputIcon icon={faUser} />
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

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
          <Button type="submit">Registrarse</Button>

          <RedirectText>
            ¿Ya tienes cuenta?{' '}
                <span onClick={() => router.push('/login')}>Inicia sesión</span>
          </RedirectText>
        </Form>
      </Container>
    </>
  )
}