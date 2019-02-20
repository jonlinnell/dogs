import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import Input from './Input';
import InputLabel from './InputLabel';
import InputError from './InputError';

const Form = styled.form`
  width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookingForm = ({ slot }) => (
  <Formik
    initialValues={{ name: '', email: '', slot }}
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
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
        <InputLabel htmlFor="name">
          Your Name
          <Input
            type="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <InputError>{errors.name && touched.name && errors.name}</InputError>
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
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default BookingForm;
