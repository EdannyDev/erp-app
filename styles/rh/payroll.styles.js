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
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  label {
    flex: 1 0 100px;
  }
`

export const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 180px;
`

export const Textarea = styled.textarea`
  flex: 1;
  min-width: 0;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const Select = styled.select`
  flex: 2;
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const CurrencyInputWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const CurrencySymbol = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
  pointer-events: none;
  font-weight: 600;
`

export const CurrencyNumberInput = styled.input`
  width: 100%;
  padding-left: 25px;
  text-align: right;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: right;
`

export const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #2563eb;
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
  }
`

export const Th = styled.th`
  color: #333;
`

export const Td = styled.td`
  text-align: center;
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

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  font-size: 1rem;

  svg {
    color: #ef4444;
    transition: color 0.2s ease-in-out;
  }

  &:hover svg {
    color: #b91c1c;
  }
`

export const EditButton = styled(IconButton)`
  svg {
    color: #fbbf24;
  }

  &:hover svg {
    color: #b45309;
  }
`

export const PayButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  font-size: 1rem;

  svg {
    color: #10b981;
    transition: color 0.2s ease-in-out;
  }

  &:hover svg {
    color: 	#059669;
  }
`

export const NoPayButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  font-size: 1rem;

  svg {
    color: #6b7280;
    transition: color 0.2s ease-in-out;
  }

  &:hover svg {
    color: #4b5563;
  }
`

export const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 300px;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.2rem 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.95rem;
`

export const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CancelButton = styled.button`
  background-color: #4b5563;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #374151;
  }
`