import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:100,200,300,400');

  html {
    font-size: 12pt;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background-color: ${({ theme }) => theme.colours.secondary};
    color: ${({ theme }) => theme.colours.primary};
    font-family: "Lato", sans-serif;
    text-align: center;
  }
`;

export default GlobalStyle;
