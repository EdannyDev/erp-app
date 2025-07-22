import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 0;
`

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.8rem;
  color: #333;
`

export const FormSection = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const FormGroup = styled.div`
  flex: 1;
  min-width: 180px;

  label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 600;
    color: #333;
  }
`

export const TextInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.2rem 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const SubmitButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  height: 35px;
  cursor: pointer;

  &:hover { background-color: #0059c1; }
`

export const CancelButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  height: 35px;

  &:hover {
    background-color: #5a6268;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`

export const SearchRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 280px;
  flex-shrink: 0;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.2rem 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const SearchIcon = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1rem;
  pointer-events: none;
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

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 0.3rem;
  font-size: 1rem;
  padding: 0.3rem;
  color: ${({ type }) =>
    type === 'edit' ? '#ffc107' :
    type === 'delete' ? '#dc3545' : 'inherit'};
  transition: color 0.3s;

  &:hover {
    color: ${({ type }) =>
      type === 'edit' ? '#e0a800' :
      type === 'delete' ? '#a12622' : 'inherit'};
  }
`

export const PaginationWrapper = styled.div`
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