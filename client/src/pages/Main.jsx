import React from 'react';

import SlotList from '../components/SlotList';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import NotificationList from '../components/NotificationList';

import { NotificationsConsumer } from '../components/NotificationsContext';

const Main = () => (
  <Section>
    <PageTitle>Doggy De-Stress</PageTitle>
    <p>Come pet the dogs</p>
    <span role="img" aria-label="dog love">
      🐶 ❤️
    </span>
    <NotificationList>
      <NotificationsConsumer>
        {({ notifications }) =>
          notifications.map(notification => (
            <Notification {...notification} key={notification.id} />
          ))
        }
      </NotificationsConsumer>
    </NotificationList>
    <SlotList />
    <Footer />
  </Section>
);

export default Main;
