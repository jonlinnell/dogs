import React from 'react';

import SlotList from '../components/SlotList';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section';
import Footer from '../components/Footer';
import Subtitle from '../components/Subtitle';
import Emoji from '../components/Emoji';
import Link from '../components/Link';

const Main = () => (
  <Section>
    <PageTitle>Doggy De-Stress</PageTitle>
    <Subtitle>
      Take 15 minutes out of your day to enjoy some time with a group of
      friendly and cuddly dogs.
    </Subtitle>
    <Subtitle>
      There are only 10 places available per slot, so please book your place in
      advance to avoid disappointment.
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
    <SlotList />
    <Footer />
  </Section>
);

export default Main;
