import styled from '@emotion/styled'

export const OrdersWrapper = styled.div`
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

export const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const TopFieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 200px;
`

export const NarrowProductField = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  flex-shrink: 0;
`

export const FieldQuantity = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100px;
  flex-shrink: 0;
`

export const FieldPrice = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 140px;
  flex-shrink: 0;
  position: relative;
`

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
`

export const Input = styled.input`
  padding: 0.4rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  height: 34px;
  width: 100%;
  box-sizing: border-box;
`

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const NarrowSelect = styled.select`
  padding: 0.4rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  height: 34px;
  width: 100%;
  box-sizing: border-box;
`

export const ItemRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.8rem;
  align-items: center;
`

export const ItemButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  flex-shrink: 0;
  height: 34px;
  align-self: flex-end;

  &:hover {
    background-color: #0069d9;
  }

  &.remove {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`

export const ItemButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`

export const RightGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`

export const TotalText = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`

export const SearchAndTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const OrdersTable = styled.table`
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
    type === 'edit' ? '#c79300' : type === 'delete' ? '#c9302c' : 'inherit'};

  &:hover {
    color: ${({ type }) =>
      type === 'edit' ? '#a67c00' : type === 'delete' ? '#a12622' : 'inherit'};
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
  margin-bottom: 0;

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

export const TopTableControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`

export const CurrencyInputWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    padding-left: 1.6rem;
    text-align: right;
  }

  &::before {
    content: '$';
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    pointer-events: none;
  }
`