import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';

import Main from './pages/Main';

import GlobalStyles from './helpers/GlobalStyle';
import theme from './theme.json';

const Test = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Main path="/" />
      </Router>
    </React.Fragment>
  </ThemeProvider>
);

render(<Test />, document.getElementById('root'));
