import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import posed, { PoseGroup } from 'react-pose';

import authContext from '../helpers/authContext';

const Times = styled.p`
  margin: 6px;
  font-weight: 300;
`;

const Capacity = styled.p`
  margin: 6px;
  margin-left: auto;

  font-size: 0.8rem;

  text-decoration: ${({ full }) => (full ? 'line-through' : 'none')};
`;

const StyledSlot = styled.li`
  margin: 12px 0;
  width: 90vw;
  max-width: 320px;
`;

const StyledBookingList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;

  & > li {
    padding: 6px 12px;
  }
`;

const StyledBooking = styled.li`
  pointer-events: none;
`;

const BookingList = posed(StyledBookingList)({
  enter: {
    delayChildren: 50,
    staggerChildren: 50,
  },
  exit: {},
});

const Booking = posed(StyledBooking)({
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
});

const SlotButton = styled.button`
  display: inline-block;

  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;

  width: 100%;
  padding: 4px;

  background: none;
  border: 1px solid ${({ theme }) => theme.colours.primary};
  border-radius: 6px;
  outline: none;

  color: ${({ theme }) => theme.colours.primary};

  @media (hover: hover) {
    &:hover {
      color: ${({ theme, full }) => (full ? theme.colours.primary : theme.colours.secondary)};
      background-color: ${({ theme, full }) =>
        full ? theme.colours.secondary : theme.colours.primary};
    }
  }

  @media (hover: none), (hover: on-demand) {
    &:hover,
    &:active {
      background-color: none;
      color: ${({ theme }) => theme.colours.primary};
    }
  }

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default ({ _id, start, end, capacity, bookings, handleSelect, adminSlotIsSelected }) => {
  const { auth } = useContext(authContext);
  const full = auth.auth ? false : bookings.length >= capacity;

  let bookingElements;

  if (adminSlotIsSelected) {
    bookingElements = bookings.map(booking => (
      <Booking key={booking._id} pose={adminSlotIsSelected ? 'enter' : 'exit'}>
        {booking.name} ({booking.email})
      </Booking>
    ));
  }

  return (
    <StyledSlot>
      <SlotButton full={full} onClick={full ? null : e => handleSelect(e, _id)}>
        <Times>
          {moment(start).format('HH mm')}
          &nbsp;&mdash;&nbsp;
          {moment(end).format('HH mm')}
        </Times>
        <Capacity full={full}>{`${bookings.length || 0} / ${capacity}`}</Capacity>
      </SlotButton>
      <BookingList pose={adminSlotIsSelected ? 'enter' : 'exit'}>
        <PoseGroup>{bookingElements}</PoseGroup>
      </BookingList>
    </StyledSlot>
  );
};
