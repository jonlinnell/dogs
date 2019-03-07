import React, { useContext } from 'react';
import styled from 'styled-components';

import BookingCheck from '../components/BookingCheck';
import Emoji from '../components/Emoji';
import Footer from '../components/Footer';
import Link from '../components/Link';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section';
import SlotList from '../components/SlotList';
import Subtitle from '../components/Subtitle';

import authContext from '../helpers/authContext';

const Container = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
  const { auth } = useContext(authContext);

  return (
    <Container>
      <Section>
        <PageTitle>Doggy De-Stress</PageTitle>
        <Subtitle>
          Take 15 minutes out of your day to enjoy some time with a group of
          friendly and cuddly dogs.
        </Subtitle>
        <Subtitle>
          There are only 10 places available per slot, so please book your place
          in advance to avoid disappointment.
        </Subtitle>
        <Subtitle>LDN.017, Thursday 7th March 2019</Subtitle>
        <Subtitle>
          Part of&nbsp;
          <Link
            href="https://www.lborolondon.ac.uk/news-events/events/umhd19/"
            target="_blank"
            rel="noopener noreferrer"
          >
            University Mental Health Day
          </Link>
          .
        </Subtitle>
        <Emoji>🐶 ❤️</Emoji>
      </Section>
      <SlotList />
      <BookingCheck />
      {auth.username ? <p>Logged in.</p> : null}
      <Footer />
    </Container>
  );
};

export default Main;
