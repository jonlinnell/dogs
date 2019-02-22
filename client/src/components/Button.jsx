import styled from 'styled-components';

const Button = styled.button`
  background: none;
  color: ${({ dark, theme: { colours } }) =>
    dark ? colours.primary : colours.dark};
  padding: ${({ isDefault }) => (isDefault ? '8px 12px' : '6px 8px')};
  border-width: ${({ isDefault }) => (isDefault ? '2px' : '1px')};
  font-size: ${({ isDefault }) => (isDefault ? '1.1rem' : '0.9rem')};
  border-color: ${({ dark, theme: { colours } }) =>
    dark ? colours.primary : colours.dark};
  border-style: solid;
  border-radius: 3px;
  margin-top: 12px;

  transition-duration: 0.2s;

  outline: none;

  &:hover {
    background-color: ${({ dark, theme: { colours } }) =>
      dark ? colours.primary : colours.dark};
    color: ${({ dark, theme: { colours } }) =>
      dark ? colours.dark : colours.primary};
  }
`;

export default Button;
