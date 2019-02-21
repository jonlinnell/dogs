import React from 'react';
import styled from 'styled-components';

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

const StyledNotification = styled.li`
  background-color: ${({ theme: { colours } }) => colours.primary};
  color: ${({ theme: { colours } }) => colours.dark};
  padding: 8px;
  border-radius: 6px;

  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const Notification = ({ message, id, type }) => (
  <NotificationsConsumer>
    {({ clearNotification }) => (
      <StyledNotification>
        {JSON.stringify(message)}
        <CloseButton type="button" onClick={() => clearNotification(id)}>
          X
        </CloseButton>
      </StyledNotification>
    )}
  </NotificationsConsumer>
);

export default Notification;
