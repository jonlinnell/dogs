import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  width: 90vh;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  opacity: 0;
  animation: ${fadeIn} 0.2s ease-out both;
`;

export default ModalContent;
