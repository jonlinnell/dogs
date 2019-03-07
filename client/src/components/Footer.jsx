import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import AdminLogin from './AdminLogin';

const StyledFooter = styled.footer`
  margin: 24px 0;
  font-size: 0.7rem;
`;

const Footer = () => (
  <StyledFooter>
    <p>
      &copy;&nbsp;
      {moment().format('YYYY')}
      &nbsp;Jon Linnell, Loughborough University London
    </p>
    <AdminLogin />
  </StyledFooter>
);

export default Footer;
