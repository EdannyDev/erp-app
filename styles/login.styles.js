import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyframes } from '@emotion/react'

const fadeInBlur = keyframes`
  from {
    backdrop-filter: blur(0);
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const scaleFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
`

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

export const InputIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 0.65rem;
  transform: translateY(-50%);
  color: #999;
  font-size: 1rem;
`

export const TogglePasswordIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  right: 0.65rem;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #555;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem 0.65rem 2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0059c1;
  }
`

export const RedirectText = styled.p`
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.95rem;

  span {
    color: #0070f3;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeInBlur} 0.3s forwards;
`

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem 2rem 2.5rem 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: ${scaleFadeIn} 0.3s forwards;
`

export const ModalTitle = styled.h3`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`

export const ModalInputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem 0.65rem 2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`

export const ModalButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0059c1;
  }
`

export const ModalCloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: #999;
  font-size: 1.25rem;

  &:hover {
    color: #555;
  }
`

export const TempPasswordText = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #d32f2f;
  font-weight: 600;
  font-size: 1rem;
`