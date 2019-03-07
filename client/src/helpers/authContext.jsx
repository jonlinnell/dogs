import React, { createContext, useReducer, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { get } from 'lodash';

import withAuthHeaders from './withAuthHeaders';

const { API } = process.env;

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set': {
        const decodedToken = jwt.decode(action.payload.token);

        return {
          auth: true,
          givenName: action.payload.givenName,
          ...decodedToken,
        };
        break;
      }
      case 'clear':
        return {
          auth: false,
          token: null,
          username: '',
          permissions: [],
        };
        break;
      default:
        return state;
        break;
    }
  }, {});

  const login = async (credentials, cb) => {
    try {
      const response = await axios.post(
        `${API}/auth/login`,
        credentials,
        withAuthHeaders()
      );

      if (get(response.data, 'authorised', false)) {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: 'set', payload: response.data });
        if (cb) {
          cb(null, response.data);
        }
      }
    } catch (error) {
      if (cb) {
        cb(get(error, 'response.data.message', 'Network error'));
      }
      dispatch({ type: 'clear' });
    }
  };

  const logout = () => {
    dispatch({ type: 'clear' });
    localStorage.removeItem('token');
  };

  const checkToken = async () => {
    try {
      const response = await axios.get(`${API}/auth/me`, withAuthHeaders());

      if (response.data.username) {
        const token = localStorage.getItem('token');
        dispatch({
          type: 'set',
          payload: Object.assign({}, response.data, { token }),
        });
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      dispatch({ type: 'clear' });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkToken();
    }
  }, []);

  return (
    <authContext.Provider value={{ login, logout, checkToken, auth }}>
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider };
export default authContext;
