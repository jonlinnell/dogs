import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Formik } from 'formik';
import axios from 'axios';
import moment from 'moment';

import Input from './Input';
import Button from './Button';
import InputLabel from './InputLabel';
import InputError from './InputError';
import CloseButton from './CloseButton';
import SectionTitle from './SectionTitle';

import readableError from '../helpers/readableError';

const { API } = process.env;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FormContainer = styled.div`
  width: 90vh;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  opacity: 0;
  animation: ${fadeIn} 0.2s ease-out both;
`;

const BookingForm = ({ slot, handleSelect }) => {
  const [status, updateStatus] = useState({ type: '', content: '' });

  if (status.type === 'success') {
    const { name, email, slot } = status.content;
    return (
      <FormContainer>
        <SectionTitle>Booking successful</SectionTitle>
        <p>
          {name} ({email})
        </p>
        <p style={{ fontSize: '0.9rem', fontWeight: 200 }}>
          registered for slot
        </p>
        <p>
          {moment(slot.start).format('HH mm')}
          &nbsp;&mdash;&nbsp;
          {moment(slot.end).format('HH mm')}
        </p>
        <CloseButton handleClose={handleSelect} />
      </FormContainer>
    );
  } else if (status.type === 'error') {
    return (
      <FormContainer>
        <SectionTitle>Error</SectionTitle>
        <p>{readableError(status.content)}</p>
        <CloseButton handleClose={handleSelect} />
      </FormContainer>
    );
  } else {
    return (
      <Formik
        initialValues={{ name: '', email: '', slot }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = 'Please enter your name.';
          }

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
            .post(`${API}/bookings`, values)
            .then(response => {
              setSubmitting(false);
              updateStatus({ type: 'success', content: response.data });
            })
            .catch(error => {
              setSubmitting(false);
              updateStatus({ type: 'error', content: error });
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
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <InputLabel style={{ marginTop: '5vh' }} htmlFor="name">
                Your Name
                <Input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <InputError>
                  {errors.name && touched.name && errors.name}
                </InputError>
              </InputLabel>
              <InputLabel htmlFor="email">
                Your Lboro email address
                <Input
                  type="email"
                  name="email"
                  width="wide"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <InputError>
                  {errors.email && touched.email && errors.email}
                </InputError>
              </InputLabel>
              <input type="hidden" name="slot" value={slot} />
              <Button
                type="submit"
                style={{ marginBottom: '30vh' }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <p>
                This data is only used to verify your booking. Data will be
                erased after the event.
              </p>
            </form>
          </FormContainer>
        )}
      </Formik>
    );
  }
};

export default BookingForm;
