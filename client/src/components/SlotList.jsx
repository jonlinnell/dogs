import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Slot from './Slot';
import Modal from './Modal';
import BookingForm from './BookingForm';

import SectionTitle from './SectionTitle';

const { API } = process.env;

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.fetchInterval = setInterval(this.fetchData(), 10000);
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  fetchData() {
    this.setState({
      fetching: true,
      hasError: false,
      error: '',
    });

    axios
      .get(`${API}/slots`)
      .then(response => {
        const sortedSlots = response.data;

        if (sortedSlots.length > 0) {
          sortedSlots.sort((a, b) => (a.start > b.start ? 1 : -1));
        }

        this.setState({
          slots: response.data,
          fetching: false,
        });
      })
      .catch(error =>
        this.setState({
          hasError: true,
          error: error.response.body,
        })
      );
  }

  setSelectedSlot(e, id = null) {
    this.setState({ selectedSlot: id });
    if (id === null) {
      this.fetchData();
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 27) {
      this.setSelectedSlot(null);
    }
  }

  render() {
    const { fetching, selectedSlot, hasError, error, slots } = this.state;

    return (
      <section>
        <Modal visible={!!selectedSlot}>
          <BookingForm
            slot={selectedSlot}
            handleSelect={this.setSelectedSlot}
          />
        </Modal>
        <SectionTitle noMarginBottom>Available slots</SectionTitle>
        <p>Tap a slot to book</p>
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
      </section>
    );
  }
}
