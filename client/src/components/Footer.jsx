import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledFooter = styled.footer`
  margin: 24px 0;
  font-size: 0.7rem;
`;

const Footer = () => (
  <StyledFooter>
    &copy;&nbsp;
    {moment().format('YYYY')}
    &nbsp;Jon Linnell, Loughborough University London
  </StyledFooter>
);

export default Footer;
