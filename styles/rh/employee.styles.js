import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Container = styled.div`
  padding: 0;
`

export const Title = styled.h2`
  margin: 1.5rem 0 0.5rem;
  color: #1f2937;
`

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  label {
    flex: 1 0 140px;
  }
`

export const SelectUser = styled.select`
  flex: 2;
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const TextInput = styled.input`
  flex: 2;
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const DateInput = styled.input`
  width: 180px;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const SalaryInputWrapper = styled.div`
  position: relative;
  width: 150px;
`

export const CurrencySymbol = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-weight: 600;
  pointer-events: none;
`

export const NumberInput = styled.input`
  width: 100%;
  padding: 0.4rem 0.4rem 0.4rem 22px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: right;
  font-size: 1rem;
`

export const SubmitButton = styled.button`
  align-self: flex-end;
  background: #2563eb;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1e40af;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.95rem;

  th, td {
    padding: 0.75rem;
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

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  font-size: 1rem;
  color: #dc3545;

  &:hover {
    color: #a12622;
  }
`

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  font-size: 1rem;
  color: #ffc107;

  &:hover {
    color: #e0a800;
  }
`

export const PaginationWrapper = styled.div`
  text-align: center;
  margin: 1rem 0;

  button {
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
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

export const BottomBar = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 240px;
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

export const CancelButton = styled.button`
  background: #6b7280;
  color: #fff;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #4b5563;
  }
`