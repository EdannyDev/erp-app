import styled from '@emotion/styled'

export const Wrapper = styled.div`
  padding: 0;
`

export const Header = styled.div`
  margin-bottom: 1rem;
  h1 {
    font-size: 1.8rem;
    color: #333;
  }
`

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
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

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  height: 35px;

  &:hover {
    background-color: #0056b3;
  }
`

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  height: 35px;
  margin-right: 0.5rem;

  &:hover {
    background-color: #5a6268;
  }
`

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`

export const SearchWrapper = styled.div`
  position: relative;
  max-width: 250px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`

export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: 1px solid #ccc;
  }

  th {
    color: #333;
  }
`

export const ActionIcon = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ type }) =>
    type === 'edit'
      ? '#ffc107'
      : type === 'delete'
      ? '#dc3545'
      : '#000'};

  &:hover {
    color: ${({ type }) =>
      type === 'edit'
        ? '#e0a800'
        : type === 'delete'
        ? '#a12622'
        : '#000'};
  }
`

export const PaginationContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`

export const PaginationButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ isActive }) => (isActive ? '#0070f3' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0070f3;
    color: #fff;
  }
`