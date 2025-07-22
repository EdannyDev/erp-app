import styled from '@emotion/styled'

export const SuppliersWrapper = styled.div`
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

export const SupplierForm = styled.form`
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

export const TextInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;

  &:hover {
    background-color: #0056b3;
  }
`

export const SuppliersTable = styled.table`
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
    type === 'edit' ? '#c79300' :
    type === 'delete' ? '#c9302c' :
    'inherit'};

  &:hover {
    color: ${({ type }) =>
      type === 'edit' ? '#a67c00' :
      type === 'delete' ? '#a12622' :
      'inherit'};
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    top: 50%;
    right: 70px;
    transform: translateY(-50%);
    color: #666;
    font-size: 0.9rem;
  }
`

export const SearchInput = styled.input`
  width: 80%;
  padding: 0.5rem;
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

export const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

export const BotonesWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #5a6268;
  }
`