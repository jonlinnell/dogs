import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';

import Main from './pages/Main';

import GlobalStyles from './helpers/GlobalStyle';
import { AuthProvider } from './helpers/authContext';
import theme from './theme.json';

const isIE = () => {
  const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  const msie = ua.indexOf('MSIE '); // IE 10 or older
  const trident = ua.indexOf('Trident/'); //IE 11

  return msie > 0 || trident > 0;
};

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      {
        process.env.API // Has the app been configured?
        ? (
          <AuthProvider>
            <Router>
              <Main path="/" />
            </Router>
          </AuthProvider>
        )
        : (
          <div style={{ height: '100vh', textAlign: 'center', margin: '20vh 10vw' }}>
            <h1>App not configured.</h1>
            <p><span style={{ fontFamily: 'Courier New'}}>process.env.API</span> isn't set. Set this environment variable and reload/rebuild the app.</p>
          </div>
        )
      }
    </React.Fragment>
  </ThemeProvider>
);

if (isIE()) {
  const message =
    'Sorry, this version of Internet Explorer is too old to run this site.\nYou can open this site on Google Chrome, or on your phone. 😊';
  document.getElementById('root').innerHTML = `<h1>${message}</h1>`;
  alert(message);
} else {
  render(<App />, document.getElementById('root'));
}
