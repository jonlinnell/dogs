import React from 'react';

import SlotList from '../components/SlotList';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section';
import Footer from '../components/Footer';

const Main = () => (
  <Section>
    <PageTitle>Doggy De-Stress</PageTitle>
    <p>Come pet the dogs</p>
    <span role="img" aria-label="dog love">
      🐶 ❤️
    </span>
    <SlotList />
    <Footer />
  </Section>
);

export default Main;
