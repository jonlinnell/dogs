import styled from 'styled-components';

const Input = styled.input`
  background: none;
  color: ${({ theme: { colours } }) => colours.dark};
  border: 1px solid ${({ theme: { colours } }) => colours.dark};
  border-radius: 3px;
  padding: 12px;
  margin: 1rem;
  outline: none;
  width: ${({ width }) => (width === 'wide' ? '100%' : 'auto')};
`;

export default Input;
