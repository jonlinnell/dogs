import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colours.dark};
    color: ${({ theme }) => theme.colours.primary};
  }
`;

export default GlobalStyle;
