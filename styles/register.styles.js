import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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