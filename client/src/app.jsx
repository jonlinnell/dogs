import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';

import Main from './pages/Main';

import GlobalStyles from './helpers/GlobalStyle';
import theme from './theme.json';

import { NotificationsProvider } from './components/NotificationsContext';

const Test = () => (
  <ThemeProvider theme={theme}>
    <NotificationsProvider>
      <React.Fragment>
        <GlobalStyles />
        <Router>
          <Main path="/" />
        </Router>
      </React.Fragment>
    </NotificationsProvider>
  </ThemeProvider>
);

render(<Test />, document.getElementById('root'));
