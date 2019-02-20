import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Times = styled.p`
  margin: 6px;
`;

const Capacity = styled.p`
  margin: 6px;
  margin-left: auto;

  font-size: 0.9rem;

  text-decoration: ${({ full }) => (full ? 'strikethrough' : 'none')};
`;

const Slot = ({
  _id,
  start,
  end,
  capacity,
  bookings,
  className,
  handleSelect,
}) => (
  <li className={className}>
    <SlotButton onClick={e => handleSelect(e, _id)}>
      <Times>
        {moment(start).format('HH mm')}
        &nbsp;&mdash;&nbsp;
        {moment(end).format('HH mm')}
      </Times>
      <Capacity full={bookings.length >= capacity}>
        {`${bookings.length || 0} / ${capacity}`}
      </Capacity>
    </SlotButton>
  </li>
);

const StyledSlot = styled(Slot)`
  margin: 12px 0;
  width: 320px;
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

  &:hover {
    color: ${({ theme }) => theme.colours.background};
    background-color: ${({ theme }) => theme.colours.primary};
  }

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default StyledSlot;
