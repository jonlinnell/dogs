import React, { useState, useEffect } from 'react';

import SectionTitle from './SectionTitle';
import Button from './Button';
import Subtitle from './Subtitle';
import Modal from './Modal';
import BookingCheckForm from './BookingCheckForm';

const BookingCheck = () => {
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    const handleKeypress = e => {
      if (e.keyCode === 27) {
        setVisibility(false);
      }
    };

    document.addEventListener('keydown', handleKeypress, false);
    return () => window.removeEventListener('keydown', handleKeypress);
  });

  return (
    <section>
      <Modal visible={visible}>
        <BookingCheckForm setModalVisibility={setVisibility} />
      </Modal>
      <SectionTitle>Check my booking</SectionTitle>
      <Subtitle>
        If you know your email address, you can check your booking.
      </Subtitle>
      <Button alternate onClick={() => setVisibility(!visible)}>
        Check
      </Button>
    </section>
  );
};

export default BookingCheck;
