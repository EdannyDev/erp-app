import styled from '@emotion/styled'

export const ReceivingWrapper = styled.div`
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

export const SearchWrapper = styled.div`
  position: relative;
  max-width: 300px;

  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #666;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const Form = styled.form`
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

export const FullWidthField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
`

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ItemRow = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const ItemSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 2;
`

export const ItemInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`

export const ItemButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &.remove {
    background-color: #dc3545;
  }

  &:hover {
    opacity: 0.9;
  }
`

export const SubmitButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 0.6rem 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background-color: #218838;
  }
`

export const TopTableControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th,
  tbody td {
    padding: 0.75rem;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }

  thead th {
    color: #333;
  }
`

export const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #c9302c;
  font-size: 1.1rem;

  &:hover {
    color: #a12622;
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

export const PaginationButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? '#0070f3' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    background-color: #0070f3;
    color: #fff;
  }
`

export const AddItemButtonWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  max-width: fit-content;
`

export const ItemLabel = styled.label`
  font-weight: bold;
  flex: 1;
  margin-bottom: 0.2rem;
  font-size: 1rem;

  &:first-of-type {
    flex: 2;
  }
`