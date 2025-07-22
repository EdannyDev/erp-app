import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PageWrapper = styled.div`
  padding: 0;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem 0.65rem 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 0.8rem;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1rem;
`;

export const TogglePassword = styled.button`
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 1rem;

  &:hover {
    color: #333;
  }
`;

export const Description = styled.div`
  flex: 1;
  font-size: 1rem;
  color: #333;
  text-align: right;
  line-height: 2.5;
`;

export const RowSeparator = styled.hr`
  margin-bottom: 2rem;
  margin-top: 2rem;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

export const LeftButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

export const RightButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

export const ButtonDanger = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;
