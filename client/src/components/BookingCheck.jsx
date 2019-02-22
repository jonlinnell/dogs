import React from 'react';

import SectionTitle from './SectionTitle';
import Button from './Button';
import Subtitle from './Subtitle';

const BookingCheck = () => {
  return (
    <section>
      <SectionTitle>Check my booking</SectionTitle>
      <Subtitle>
        If you know your email address, you can check your booking.
      </Subtitle>
      <Button dark>Check</Button>
    </section>
  );
};

export default BookingCheck;
