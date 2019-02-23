import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  min-height: 100vh;
  width: 100vw;
  z-index: 1;

  transition: opacity 0.1s linear;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};

  background-color: ${({ theme: { colours } }) => colours.modalBackground};
  color: ${({ theme: { colours } }) => colours.primary};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookingModal = ({ visible, children }) => (
  <Modal visible={visible}>{visible ? children : null}</Modal>
);

export default BookingModal;
