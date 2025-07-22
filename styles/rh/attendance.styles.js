import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Container = styled.div`
  padding: 0;
`

export const Title = styled.h2`
  margin: 1.5rem 0 .5rem;
  color: #1f2937;
`

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  font-size: .95rem;

  label {
    font-weight: 500;
  }
`

export const Select = styled.select`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const DateInput = styled.input`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 200px;
`

export const Textarea = styled.textarea`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  resize: vertical;
`

export const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #2563eb;
  color: white;
  padding: .6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1e40af;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: .95rem;

  th, td {
    padding: .75rem;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }
`

export const Th = styled.th`
  color: #333;
`

export const Td = styled.td`
  vertical-align: middle;
`

export const IconButton = styled.button`
  background: transparent;
  color: #dc3545;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #a12622;
  }
`

export const EditButton = styled.button`
  background: transparent;
  color: #ffc107;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-right: .5rem;

  &:hover {
    color: #e0a800;
  }
`

export const PaginationWrapper = styled.div`
  text-align: center;
  margin: 1rem 0;

  button {
    margin: 0 .25rem;
    padding: .5rem 1rem;
    background: #e5e7eb;
    color: #374151;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.active {
      background: #2563eb;
      color: #fff;
      font-weight: bold;
    }

    &:hover {
      background: #cbd5e1;
    }
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 280px;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #374151;
`

export const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`

export const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CancelButton = styled.button`
  background-color: #4b5563;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #374151;
  }
`