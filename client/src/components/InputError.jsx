import React from 'react';
import styled from 'styled-components';

const InputError = styled.p`
  color: ${({ theme: { colours } }) => colours.error};
  font-size: 0.9rem;
  height: 1rem;
`;

export default InputError;
