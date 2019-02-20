import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Slot from './Slot';

import SectionTitle from './SectionTitle';

import { host } from '../../config';

const StyledSlotList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 6px 0;
`;

export default class SlotList extends Component {
  constructor(props) {
    super(props);

    this.fetchInterval = null;

    this.state = {
      fetching: false,
      hasError: false,
      selectedSlot: null,
      error: '',
      slots: [],
    };

    this.setSelectedSlot = this.setSelectedSlot.bind(this);
    this.clearSelectedSlot = this.clearSelectedSlot.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.fetchInterval = setInterval(this.fetchData(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  fetchData() {
    this.setState({
      fetching: true,
      hasError: false,
      error: '',
    });

    axios
      .get(`${host}/slots`)
      .then(response =>
        this.setState({
          slots: response.data,
          fetching: false,
        })
      )
      .catch(error =>
        this.setState({
          hasError: true,
          error: error.response.body,
        })
      );
  }

  setSelectedSlot(id) {
    this.setState({ selectedSlot: id });
  }

  clearSelectedSlot(e) {
    this.setState({ selectedSlot: null });
  }

  render() {
    const { fetching, selectedSlot, hasError, error, slots } = this.state;

    return (
      <div>
        <p>{selectedSlot}</p>
        <SectionTitle>Book a slot...</SectionTitle>
        {hasError ? (
          <div>
            <h5>Error Zone</h5>
            {hasError ? <pre>{error}</pre> : <p>No errors</p>}
          </div>
        ) : (
          <StyledSlotList>
            {slots.map(slot => (
              <Slot
                {...slot}
                handleSelect={this.setSelectedSlot}
                key={slot._id}
              >
                {slot.start}
              </Slot>
            ))}
          </StyledSlotList>
        )}
      </div>
    );
  }
}
