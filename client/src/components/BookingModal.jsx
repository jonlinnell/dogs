import React from 'react';
import styled from 'styled-components';

import BookingForm from './BookingForm';

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100vw;
  z-index: 1;

  transition: opacity 0.1s linear;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};

  background-color: ${({ theme: { colours } }) => colours.primaryAlternate};
  color: ${({ theme: { colours } }) => colours.dark};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookingModal = ({ visible, slot, handleSelect }) => {
  return (
    <Modal visible={visible}>
      {visible && slot ? (
        <BookingForm handleSelect={handleSelect} slot={slot} />
      ) : null}
    </Modal>
  );
};

export default BookingModal;
