import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Container = styled.div`
  padding: 0;
`

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const Input = styled.input`
  padding: 0.5rem;
  flex: 1 1 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 250px;
  margin-bottom: 1rem;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.2rem 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`

export const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1rem;
  pointer-events: none;
`

export const Select = styled.select`
  padding: 0.5rem;
  flex: 1 1 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1 1 200px;
  font-size: 0.9rem;
`

export const Checkbox = styled.input`
  transform: scale(1.2);
  cursor: pointer;
`

export const Button = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;

  &:hover { background-color: #0059c1; }
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

export const CancelButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: #6b7280;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #4b5563;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: .75rem;
    border-bottom: 1px solid #ccc;
  }
`

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  color: #333;
`

export const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
`

export const Pagination = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    border: none;
    background: #e5e7eb;
    border-radius: 4px;
    cursor: pointer;
  }

  button.active {
    background: #0070f3;
    color: #fff;
  }
`

export const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 1.3rem;
  transition: color 0.2s ease;

  color: ${({ color }) =>
    color === 'edit' ? '#ffc107'     
    : color === 'delete' ? '#dc3545'
    : '#6b7280'};

  &:hover {
    color: ${({ color }) =>
      color === 'edit' ? '#e0a800'
      : color === 'delete' ? '#a12622'
      : '#4b5563'};
  }
`