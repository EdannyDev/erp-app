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
`

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5rem;
  font-size: .95rem;

  label {
    flex: 1 0 100px;
  }
`

export const DateInput = styled.input`
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 180px;
`

export const Textarea = styled.textarea`
  flex: 1;
  min-width: 0;
  padding: .5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const Select = styled.select`
  flex: 2;
  padding: .4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

export const LineButton = styled.button`
  background: #ef4444;
  color: #fff;
  border: none;
  padding: .4rem .8rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover { background: #b91c1c; }
`

export const AddLineButton = styled.button`
  align-self: flex-start;
  background-color: #22c55e;
  color: white;
  padding: .5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

  &:hover { background-color: #16a34a; }
`

export const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #2563eb;
  color: white;
  padding: .7rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover { background: #1e40af; }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: .95rem;

  th, td {
    padding: .75rem;
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

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  font-size: 1rem;

  svg {
    color: #dc3545;
    transition: color 0.2s ease-in-out;
  }

  &:hover svg {
    color: #a12622;
  }
`

export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
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

export const CurrencyInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PesoIcon = styled.span`
  position: absolute;
  left: 10px;
  font-size: 1rem;
  color: #6b7280;
`;

export const CurrencyInput = styled.input`
  padding: .4rem .5rem .4rem 1.5rem;
  width: 100px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: right;
`;