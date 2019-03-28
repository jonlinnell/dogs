import styled from 'styled-components';

const Button = styled.button`
  background: none;
  color: ${({ alternate, theme: { colours } }) =>
    alternate ? colours.primary : colours.secondary};
  padding: ${({ isDefault }) => (isDefault ? '8px 12px' : '6px 8px')};
  border-width: ${({ isDefault }) => (isDefault ? '2px' : '1px')};
  font-size: ${({ isDefault }) => (isDefault ? '1.1rem' : '0.9rem')};
  border-color: ${({ alternate, theme: { colours } }) =>
    alternate ? colours.primary : colours.secondary};
  border-style: solid;
  border-radius: 3px;
  margin-top: 12px;

  transition-duration: 0.2s;

  outline: none;

  &:hover {
    background-color: ${({ alternate, theme: { colours } }) =>
      alternate ? colours.primary : colours.secondary};
    color: ${({ alternate, theme: { colours } }) =>
      alternate ? colours.secondary : colours.primary};
  }
`;

export default Button;
