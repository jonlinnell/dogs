import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import axios from 'axios';

import Input from './Input';
import Button from './Button';
import InputLabel from './InputLabel';
import InputError from './InputError';

import { host } from '../../config';

const Form = styled.form`
  width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default class BookingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: '',
    };
  }

  handleError(error) {
    console.log(error);
  }

  render() {
    const { slot } = this.props;
    const { hasError, error } = this.state;

    return (
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
          axios
            .post(`${host}/bookings`, values)
            .then(response => {
              console.log(response);
              setSubmitting(false);
            })
            .catch(error => {
              this.handleError(error);
              setSubmitting(false);
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
            <InputLabel htmlFor="name">
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
            {hasError ? <InputError>{error}</InputError> : null}
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}
