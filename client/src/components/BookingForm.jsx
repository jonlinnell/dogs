import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import axios from 'axios';

import Input from './Input';
import Button from './Button';
import InputLabel from './InputLabel';
import InputError from './InputError';

import { NotificationsConsumer } from './NotificationsContext';

import readableError from '../helpers/readableError';

const { API } = process.env;

const Form = styled.form`
  width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookingForm = ({ slot, handleSelect }) => (
  <NotificationsConsumer>
    {({ addNotification }) => (
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
              handleSelect();
              addNotification(
                "Booking successful! We'll send you a confirmation email before March 7th.",
                'success'
              );
            })
            .catch(error => {
              setSubmitting(false);
              handleSelect();
              addNotification(readableError(error), 'error');
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
          <Form onSubmit={handleSubmit}>
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
              This data is only used to verify your booking. Data will be erased
              after the event.
            </p>
          </Form>
        )}
      </Formik>
    )}
  </NotificationsConsumer>
);

export default BookingForm;
