import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { get } from 'lodash';

import Button from './Button';
import Slot from './Slot';

import authContext from '../helpers/authContext';
import withAuthHeaders from '../helpers/withAuthHeaders';

const { API } = process.env;

const StyledSlotList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 6px 0;
`;

const DetailedSlotList = () => {
  const { auth } = useContext(authContext);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(false);
  const [selectedDetailedSlot, setSelectedDetailedSlot] = useState();

  const toggleSelectedSlot = (e, id) => {
    if (selectedDetailedSlot === id) {
      setSelectedDetailedSlot();
    } else {
      setSelectedDetailedSlot(id);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get(
        `${API}/slots/details`,
        withAuthHeaders()
      );

      if (response.data) {
        setSlots(response.data);
      }
    } catch (error) {
      setError(get(error, 'response.data.message', 'Error'));
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Button onClick={fetchSlots}>Try again</Button>
      </div>
    );
  } else {
    return (
      <StyledSlotList>
        {slots.map(slot => (
          <Slot
            key={slot._id}
            adminSlotIsSelected={selectedDetailedSlot === slot._id}
            handleSelect={toggleSelectedSlot}
            {...slot}
          />
        ))}
      </StyledSlotList>
    );
  }
};

export default DetailedSlotList;
