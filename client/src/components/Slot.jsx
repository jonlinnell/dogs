import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

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
      color: ${({ theme, full }) =>
        full ? theme.colours.primary : theme.colours.dark};
      background-color: ${({ theme, full }) =>
        full ? theme.colours.dark : theme.colours.primary};
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

export default ({
  _id,
  start,
  end,
  capacity,
  bookings,
  className,
  handleSelect,
}) => {
  const full = bookings.length >= capacity;

  return (
    <StyledSlot>
      <SlotButton
        full={full}
        onClick={e => (full ? null : handleSelect(e, _id))}
      >
        <Times>
          {moment(start).format('HH mm')}
          &nbsp;&mdash;&nbsp;
          {moment(end).format('HH mm')}
        </Times>
        <Capacity full={full}>
          {`${bookings.length || 0} / ${capacity}`}
        </Capacity>
      </SlotButton>
    </StyledSlot>
  );
};
