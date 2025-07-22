import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '@/services/axiosInstance';
import {
  PageWrapper,
  Title,
  FormRow,
  InputWrapper,
  Input,
  Icon,
  TogglePassword,
  Description,
  RowSeparator,
  ButtonsWrapper,
  LeftButton,
  RightButton,
  Button,
  ButtonDanger
} from '@/styles/profile.styles';
import Modal from '@/components/modal';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faUser, faEnvelope, faLock, faEye, faEyeSlash, faAddressCard } from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      router.push('/login');
      return;
    }

    setUserId(user.id);

    axios.get(`/user/profile/${user.id}`)
      .then(res => {
        setFormData({ name: res.data.name, email: res.data.email, password: '', role: res.data.role });
      })
      .catch(() => {
        setNotification({ message: 'Error al cargar el perfil', type: 'error' });
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
  setLoading(true);
  try {
    const { role, ...updateData } = formData;
    const user = JSON.parse(localStorage.getItem('user'));
    const nameChanged = formData.name !== user.name;
    const emailChanged = formData.email !== user.email;
    const passwordChanged = formData.password.trim() !== '';

    if (!passwordChanged) {
      delete updateData.password;
    }

    await axios.put(`/user/profile/${userId}`, updateData);
    if (passwordChanged && (nameChanged || emailChanged)) {
      setNotification({ message: 'Perfil y contraseña actualizados. Inicia sesión de nuevo.', type: 'success' });
    } else if (passwordChanged) {
      setNotification({ message: 'Contraseña actualizada correctamente. Inicia sesión nuevamente.', type: 'success' });
    } else {
      setNotification({ message: 'Perfil actualizado correctamente.', type: 'success' });
    }

    if (passwordChanged) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } catch {
    setNotification({ message: 'Error al actualizar el perfil', type: 'error' });
  } finally {
    setLoading(false);
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/user/profile/${userId}`);
      setNotification({ message: 'Cuenta eliminada correctamente', type: 'success' });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setTimeout(() => router.push('/login'), 1500);
    } catch {
      setNotification({ message: 'Error al eliminar la cuenta', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <PageWrapper>
      <Title>Editar Perfil</Title>

      <FormRow>
        <InputWrapper>
          <Icon icon={faUser} />
          <Input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
          />
        </InputWrapper>
        <Description>
          Escribe tu nombre completo tal como deseas que aparezca en tu perfil.
        </Description>
      </FormRow>

      <RowSeparator thick />

      <FormRow>
        <InputWrapper>
          <Icon icon={faEnvelope} />
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
          />
        </InputWrapper>
        <Description>
          Introduce un correo electrónico válido. Será tu usuario para iniciar sesión.
        </Description>
      </FormRow>

      <RowSeparator />

      <FormRow>
        <InputWrapper>
          <Icon icon={faLock} />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Nueva contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          <TogglePassword onClick={() => setShowPassword(prev => !prev)}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePassword>
        </InputWrapper>
        <Description>
          Puedes cambiar tu contraseña aquí. Déjalo vacío si no deseas modificarla.
        </Description>
      </FormRow>

      <RowSeparator thick />

      <FormRow>
        <InputWrapper>
          <Icon icon={faAddressCard} />
          <Input
            type="text"
            name="role"
            value={formData.role}
            disabled
          />
        </InputWrapper>
        <Description>
          Este es tu rol asignado por el sistema. NO es editable.
        </Description>
      </FormRow>

      <RowSeparator thick />

      <ButtonsWrapper>
        <LeftButton>
          <Button onClick={handleUpdate} disabled={loading}>
            <FontAwesomeIcon icon={faSave} /> Guardar cambios
          </Button>
        </LeftButton>
        <RightButton>
          <ButtonDanger onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar cuenta
          </ButtonDanger>
        </RightButton>
      </ButtonsWrapper>

      {showModal && (
        <Modal
          message="¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      <Notification message={notification.message} type={notification.type} />
    </PageWrapper>
  )
}