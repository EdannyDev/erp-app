import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 0;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const ReportTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.75rem;
`

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SearchInputContainer = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 300px;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const SearchIcon = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
`

export const SwitchButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-weight: 600;

  &:hover {
    background-color: #0057c2;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;

  th, td {
    padding: 0.75rem;
    border-bottom: 1px solid #ccc;
  }
`

export const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  color: #333;
`

export const TableRow = styled.tr`
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
`

export const TableCell = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
`

export const TotalRow = styled.tr`
  font-weight: bold;
  background-color: #ddd;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

export const PageButton = styled.button`
  padding: 0.4rem 0.75rem;
  margin: 0 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#0070f3' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#0057c2' : '#f0f0f0')};
  }
`

export const TotalsContainer = styled.div`
  margin-top: 1rem;
  line-height: 1.6;

  div {
    margin-bottom: 0.4rem;
  }
`