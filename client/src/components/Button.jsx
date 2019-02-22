import styled from 'styled-components';

const Button = styled.button`
  background: none;
  color: ${({ theme: { colours } }) => colours.dark};
  border-width: ${({ isDefault }) => (isDefault ? '2px' : '1px')};
  border-style: solid;
  border-color: ${({ theme: { colours } }) => colours.dark};
  border-radius: 3px;
  padding: ${({ isDefault }) => (isDefault ? '8px 12px' : '6px 8px')};
  margin-top: 12px;

  transition-duration: 0.2s;

  &:hover {
    background-color: ${({ theme: { colours } }) => colours.dark};
    color: ${({ theme: { colours } }) => colours.primary};
    border-color: ${({ theme: { colours } }) => colours.primary};
  }
`;

export default Button;
