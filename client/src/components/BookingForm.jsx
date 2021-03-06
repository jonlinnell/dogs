import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import moment from 'moment';

import Input from './Input';
import Button from './Button';
import InputGroup from './InputGroup';
import InputError from './InputError';
import CloseButton from './CloseButton';
import SectionTitle from './SectionTitle';
import ModalContent from './ModalContent';
import ButtonArea from './ButtonArea';

import readableError from '../helpers/readableError';

const { API } = process.env;

const BookingForm = ({ slot, handleSelect }) => {
  const [status, setStatus] = useState({ type: '', content: '' });

  if (status.type === 'success') {
    const { name, bookedSlot } = status.content;
    return (
      <ModalContent>
        <SectionTitle noMarginTop>Booking successful</SectionTitle>
        <p>
          You&apos;re registered for slot&nbsp;
          {moment(bookedSlot.start).format('HH mm')}
          &nbsp;&mdash;&nbsp;
          {moment(bookedSlot.end).format('HH mm')}.
        </p>
        <p>See you there, {name}.</p>
        <CloseButton handleClose={handleSelect} />
      </ModalContent>
    );
  }

  if (status.type === 'error') {
    return (
      <ModalContent>
        <SectionTitle noMarginTop>Error</SectionTitle>
        <p>{readableError(status.content)}</p>
        <CloseButton handleClose={handleSelect} />
      </ModalContent>
    );
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', slot }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Please enter your name.';
        }

        if (!values.email) {
          errors.email = 'Your lboro.ac.uk email address is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post(`${API}/bookings`, values)
          .then(response => {
            setSubmitting(false);
            setStatus({ type: 'success', content: response.data });
          })
          .catch(error => {
            setSubmitting(false);
            setStatus({ type: 'error', content: error });
          });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <InputGroup style={{ marginTop: '5vh' }} htmlFor="name">
              Your Name
              <Input
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <InputError>{errors.name && touched.name && errors.name}</InputError>
            </InputGroup>
            <InputGroup htmlFor="email">
              Your Lboro email address
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <InputError>{errors.email && touched.email && errors.email}</InputError>
            </InputGroup>
            <input type="hidden" name="slot" value={slot} />
            <ButtonArea>
              <Button
                type="submit"
                style={{ marginBottom: '12px' }}
                disabled={isSubmitting}
                isDefault
                alternate
              >
                Book
              </Button>
              <Button type="button" onClick={handleSelect} alternate>
                Cancel
              </Button>
            </ButtonArea>
            <p style={{ fontSize: '0.9rem' }}>
              This data is only used to verify your booking. Data will be erased after the event.
            </p>
          </form>
        </ModalContent>
      )}
    </Formik>
  );
};

export default BookingForm;
