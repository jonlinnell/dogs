import React from 'react';
import styled from 'styled-components';

const Emoji = styled.span`
  font-size: 1.7rem;
`;

export default ({ children }) => (
  <Emoji role="img" aria-label="Emoji">
    {children}
  </Emoji>
);
