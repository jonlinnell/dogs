import 'babel-polyfill';
import React, { useContext } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';

import Main from './pages/Main';

import GlobalStyles from './helpers/GlobalStyle';
import authContext, { AuthProvider } from './helpers/authContext';
import theme from './theme.json';

const isIE = () => {
  const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  const msie = ua.indexOf('MSIE '); // IE 10 or older
  const trident = ua.indexOf('Trident/'); //IE 11

  return msie > 0 || trident > 0;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyles />
        <AuthProvider>
          <Router>
            <Main path="/" />
          </Router>
        </AuthProvider>
      </React.Fragment>
    </ThemeProvider>
  );
};

if (isIE()) {
  const message =
    'Sorry, this version of Internet Explorer is too old to run this site.\nYou can open this site on Google Chrome, or on your phone. 😊';
  document.getElementById('root').innerHTML = `<h1>${message}</h1>`;
  alert(message);
} else {
  render(<App />, document.getElementById('root'));
}
