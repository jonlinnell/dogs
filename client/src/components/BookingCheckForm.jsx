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

const { API } = process.env;

const BookingCheckForm = ({ setModalVisibility }) => {
  const [status, setStatus] = useState({ type: '', content: '' });

  if (status.type === 'success') {
    const { name, slot } = status.content;
    return (
      <ModalContent>
        <SectionTitle noMarginTop>{name}</SectionTitle>
        <p>You are registered for slot:</p>
        <p>
          {moment(slot.start).format('HH mm')}
          &nbsp;&mdash;&nbsp;
          {moment(slot.end).format('HH mm')}
        </p>
        <CloseButton handleClose={() => setModalVisibility(false)} />
      </ModalContent>
    );
  } else if (status.type === 'error' || status.type === 'empty') {
    return (
      <ModalContent>
        <SectionTitle noMarginTop>Booking not found</SectionTitle>
        <p>
          Make sure you entered your email address properly (and that you booked
          a slot!)
        </p>
        <CloseButton handleClose={() => setModalVisibility(false)} />
      </ModalContent>
    );
  } else {
    return (
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Your lboro.ac.uk email address is required.';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .get(`${API}/bookings/byEmail/${values.email}`)
            .then(response => {
              setSubmitting(false);
              if (response.data) {
                setStatus({ type: 'success', content: response.data });
              } else {
                setStatus({ type: 'empty' });
              }
            })
            .catch(error => {
              setSubmitting(false);
              setStatus({ type: 'error' });
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <InputGroup htmlFor="email">
                Your Lboro email address
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <InputError>
                  {errors.email && touched.email && errors.email}
                </InputError>
              </InputGroup>
              <ButtonArea>
                <Button
                  type="submit"
                  style={{ marginBottom: '12px' }}
                  disabled={isSubmitting}
                  isDefault
                  alternate
                >
                  Check
                </Button>
                <Button
                  type="button"
                  onClick={() => setModalVisibility(false)}
                  alternate
                >
                  Cancel
                </Button>
              </ButtonArea>
            </form>
          </ModalContent>
        )}
      </Formik>
    );
  }
};

export default BookingCheckForm;
