import styled from '@emotion/styled'

export const InvoicesWrapper = styled.div`
  padding: 0;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
  }
`

export const InvoiceForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 200px;
`

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
`

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`

export const InvoicesTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }

  th {
    color: #333;
  }
`

export const ActionIcon = styled.button`
  background: none;
  border: none;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  color: ${({ type }) =>
    type === 'edit' ? '#ffc107' :
    type === 'delete' ? '#dc3545' :
    '#666'};

  &:hover {
    color: ${({ type }) =>
      type === 'edit' ? '#e0a800' :
      type === 'delete' ? '#a12622' :
      '#444'};
  }
`

export const ItemsContainer = styled.div`
  width: 100%;
`

export const LabelsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`

export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

export const ButtonsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

export const AddItemButton = styled.button`
  background: none;
  border: 1px dashed #666;
  color: #666;
  padding: 0.45rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  height: 38px;

  &:hover {
    background: #f0f0f0;
  }
`

export const RemoveItemButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.45rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a12622;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;

  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #666;
    font-size: 0.9rem;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
`

export const PaginationButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ isActive }) => (isActive ? '#0070f3' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0070f3;
    color: white;
  }
`