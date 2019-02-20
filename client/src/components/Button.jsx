import styled from 'styled-components';

const Button = styled.button`
  background: none;
  color: ${({ theme: { colours } }) => colours.dark};
  border: 2px solid ${({ theme: { colours } }) => colours.dark};
  border-radius: 3px;
  padding: 12px;
  margin-top: 12px;
  outline: none;

  transition-duration: 0.2s;

  &:hover {
    background-color: ${({ theme: { colours } }) => colours.dark};
    color: ${({ theme: { colours } }) => colours.primary};
    border: 2px solid ${({ theme: { colours } }) => colours.primary};
  }
`;

export default Button;
