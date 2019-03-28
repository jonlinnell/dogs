import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import authContext from '../helpers/authContext';
import AdminLoginForm from './AdminLoginForm';

const AdminButton = styled.button`
  background: none;
  border: none;
  outline: none;

  margin: 0;
  padding: 0;

  color: white;
`;

const BookingCheck = () => {
  const [visible, setVisibility] = useState(false);

  const { auth, logout } = useContext(authContext);

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
    <React.Fragment>
      <Modal visible={visible}>
        <AdminLoginForm setModalVisibility={setVisibility} />
      </Modal>
      {auth.username ? (
        <AdminButton onClick={() => logout()}>Logout</AdminButton>
      ) : (
        <AdminButton onClick={() => setVisibility(!visible)}>Login</AdminButton>
      )}
    </React.Fragment>
  );
};

export default BookingCheck;
