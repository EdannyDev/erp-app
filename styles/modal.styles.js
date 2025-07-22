import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const fadeInBlur = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(3px);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeInBlur} 0.3s ease forwards;
  backdrop-filter: blur(3px);
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: fadeInBlur 0.3s ease;
`

export const WarningIcon = styled(FontAwesomeIcon)`
  color: #f59e0b;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: ${pulse} 0.8s ease-in-out infinite;
`

export const ModalText = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

export const ConfirmButton = styled.button`
  background-color: #16a34a;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #15803d;
  }
`

export const CancelButton = styled.button`
  background-color: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #d1d5db;
  }
`