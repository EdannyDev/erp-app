import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NotificationContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type }) =>
    type === 'success' ? '#28a745' : '#dc3545'};
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  font-weight: 500;
  font-size: 1rem;
  min-width: 250px;
  max-width: 80%;
  text-align: center;
`

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: #fff;
`