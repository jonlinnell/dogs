import React, { useState, useContext } from 'react';
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

import authContext from '../helpers/authContext';

const { API } = process.env;

const BookingCheckForm = ({ setModalVisibility }) => {
  const [status, setStatus] = useState({ type: '', content: '' });
  const { login } = useContext(authContext);

  if (status.type === 'success') {
    const { givenName } = status.content;
    return (
      <ModalContent>
        <SectionTitle noMarginTop>Logged in</SectionTitle>
        <p>Hi {givenName}, welcome back. You can close this now.</p>
        <CloseButton handleClose={() => setModalVisibility(false)} />
      </ModalContent>
    );
  } else if (status.type === 'error') {
    return (
      <ModalContent>
        <SectionTitle noMarginTop>Login Error</SectionTitle>
        <p>{status.content}</p>
        <CloseButton handleClose={() => setModalVisibility(false)} />
      </ModalContent>
    );
  } else {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.username) {
            errors.username = 'You must enter a username.';
          }

          if (!values.password) {
            errors.password = 'You must enter a password.';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          login(values, (error, data) => {
            setSubmitting(false);

            if (error) {
              setStatus({
                type: 'error',
                content: error,
              });
            } else {
              setStatus({ type: 'success', content: data });
            }
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
              <InputGroup htmlFor="username">
                Username
                <Input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <InputError>
                  {errors.username && touched.email && errors.username}
                </InputError>
              </InputGroup>
              <InputGroup htmlFor="password">
                Password
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <InputError>
                  {errors.password && touched.email && errors.password}
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
                  Login
                </Button>
                <Button
                  type="button"
                  onClick={() => setModalVisibility(false)}
                  alternate
                >
                  Close
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
