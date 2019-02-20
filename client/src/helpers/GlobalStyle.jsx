import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300');

  html {
    font-size: 12pt;
  }

  body {
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.primary};
    font-family: "Lato", sans-serif;
    text-align: center;
  }
`;

export default GlobalStyle;
