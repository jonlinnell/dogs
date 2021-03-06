import styled from 'styled-components';

const Input = styled.input`
  background: none;
  color: ${({ theme: { colours } }) => colours.primary};
  border: 1px solid ${({ theme: { colours } }) => colours.primary};
  border-radius: 3px;
  padding: 12px;
  margin-top: 12px;
  outline: none;
`;

export default Input;
