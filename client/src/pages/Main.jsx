import React from 'react';

import SlotList from '../components/SlotList';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section';

const Main = () => (
  <Section>
    <PageTitle>Doggy De-Stress</PageTitle>
    <p>Come pet the dogs</p>
    <span role="img" aria-label="dog love">
      🐶 ❤️
    </span>
    <SlotList />
  </Section>
);

export default Main;
