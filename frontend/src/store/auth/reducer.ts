import { Reducer } from 'redux';

import { AuthStateType, AuthActionTypes } from './types';

export const auth: Reducer = (
  state: AuthStateType = {
    isAuthenticated: false,
    authenticationFailed: false,
    statusText: 'Please log in',
    username: '',
    token: ''
  },
  action: AuthActionTypes
) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: true,
        authenticationFailed: false,
        statusText: 'You are logged in',
        username: action.username,
        token: action.token
      };

    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        authenticationFailed: true,
        statusText: `Error: ${action.error}`,
        token: ''
      };

    case 'LOGOUT':
      return {
        isAuthenticated: false,
        authenticationFailed: false,
        statusText: 'Please log in',
        token: ''
      };

    default:
      return state;
  }
};
