import { faCheck, faTimes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ModalOverlay,
  ModalContent,
  WarningIcon,
  ModalText,
  ButtonGroup,
  ConfirmButton,
  CancelButton
} from '@/styles/modal.styles'

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalText>{message}</ModalText>
        <WarningIcon icon={faTriangleExclamation} />
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>
            <FontAwesomeIcon icon={faCheck} /> Confirmar
          </ConfirmButton>
          <CancelButton onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} /> Cancelar
          </CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  )
}