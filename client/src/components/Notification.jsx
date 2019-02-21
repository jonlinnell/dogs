import React from 'react';
import styled, { keyframes } from 'styled-components';

import { NotificationsConsumer } from './NotificationsContext';

const CloseButton = styled.button`
  border: none;
  outline: none;
  background: none;
  margin-left: auto;

  font-size: 0.6rem;
  color: ${({ theme: { colours } }) => colours.dark};
  font-weight: 400;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledNotification = styled.li`
  background-image: ${({ type, theme: { notificationBackgrounds } }) =>
    notificationBackgrounds[type]};

  font-size: 0.9rem;
  color: #fcfcfc;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 6px;

  opacity: 0;
  animation: ${fadeIn} 0.2s ease-in both;
  animation-delay: 1s;

  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const Notification = ({ message, id, type }) => (
  <NotificationsConsumer>
    {({ clearNotification }) => (
      <StyledNotification type={type}>
        {message}
        <CloseButton type="button" onClick={() => clearNotification(id)}>
          X
        </CloseButton>
      </StyledNotification>
    )}
  </NotificationsConsumer>
);

export default Notification;
