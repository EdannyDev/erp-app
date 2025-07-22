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

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: .4rem;
  font-size: .95rem;
  min-width: 200px;

  label {
    font-weight: 500;
  }
`

export const Select = styled.select`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const CurrencyInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
`

export const PesoIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1rem;
  pointer-events: none;
`

export const CurrencyInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`

export const TextInput = styled.input`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 325px;
`

export const DateInput = styled.input`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 150px;
`

export const SubmitButton = styled.button`
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
  border: none;
  cursor: pointer;
  font-size: 1rem;
`

export const EditButton = styled(IconButton)`
  color: #ffc107;
  margin-right: 0.5rem;

  &:hover {
    color: #e0a800;
  }
`

export const DeleteButton = styled(IconButton)`
  color: #dc3545;
  &:hover {
    color: #a12622;
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

export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 250px;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`

export const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1rem;
  pointer-events: none;
`

export const CancelButton = styled.button`
  background-color: #9ca3af;
  color: white;
  padding: .6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #6b7280;
  }
`