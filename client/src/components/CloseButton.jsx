import React from 'react';
import styled from 'styled-components';

const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;

  margin-top: 32px;
  font-size: 32px;
  font-weight: 100;

  color: ${({ theme: { colours } }) => colours.primary};
`;

export default ({ handleClose }) => (
  <CloseButton type="button" onClick={handleClose}>
    X
  </CloseButton>
);
