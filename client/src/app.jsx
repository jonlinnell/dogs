import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './helpers/GlobalStyle';
import theme from './helpers/theme.json';

const Test = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      <div>Test</div>
    </React.Fragment>
  </ThemeProvider>
);

render(<Test />, document.getElementById('root'));
