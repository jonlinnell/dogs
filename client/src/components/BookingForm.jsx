import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import axios from 'axios';
import { get } from 'lodash';

import Input from './Input';
import Button from './Button';
import InputLabel from './InputLabel';
import InputError from './InputError';

import { NotificationsConsumer } from './NotificationsContext';

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

  render() {
    const { slot, handleSelect } = this.props;
    const { hasError, error } = this.state;

    return (
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
                .post(`${host}/bookings`, values)
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
                  addNotification('Summat done gone wrong', 'error');
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
                <InputError>{error}</InputError>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </NotificationsConsumer>
    );
  }
}
