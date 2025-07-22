import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 0;
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`

export const Section = styled.section`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #888;
`

export const Divider = styled.hr`
  margin-top: -20px;
  margin-bottom: 10px;
`

export const SectionTitle = styled.h2`
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #222;
`

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-weight: 600;
    color: #444;
    margin-bottom: 0.4rem;
  }

  input[type='checkbox'] {
    transform: scale(1.2);
    margin-right: 0.4rem;
  }
`

export const TextInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

`

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`

export const ButtonContainer = styled.div`
  margin-top: 1rem;
`

export const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`

export const CancelButton = styled.button`
  background-color: #ef4444;
  color: white;
  font-weight: 700;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 1rem;

  &:hover {
    background-color: #b91c1c;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border-bottom: 1px solid #ddd;
    padding: 0.75rem;
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
  color: #ef4444;
  font-size: 1rem;
  margin-left: 1.6rem;

  &:hover {
    color: #b91c1c;
  }
`

export const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;

  button {
    background: none;
    border: 1px solid #ccc;
    margin: 0 0.15rem;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;

    &.active {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    &:hover:not(.active) {
      background-color: #e0e7ff;
    }
  }
`

export const TaxFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const TaxButtonContainer = styled.div`
  grid-column: 1 / -1;
  margin-top: -1.1rem;
`