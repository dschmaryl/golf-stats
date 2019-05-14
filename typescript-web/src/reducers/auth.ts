import { Reducer } from 'redux';

import { AuthStateType, AuthActionTypes } from '../types/auth';

export const auth: Reducer = (
  state: AuthStateType = {
    isAuthenticated: false,
    authenticationFailed: false,
    statusText: 'Please log in'
  },
  action: AuthActionTypes
) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: true,
        authenticationFailed: false,
        statusText: 'You are logged in'
      };

    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        authenticationFailed: true,
        statusText: `Error logging in: ${action.error}`
      };

    case 'LOGOUT':
      return {
        isAuthenticated: false,
        authenticationFailed: false,
        statusText: 'Please log in'
      };

    default:
      return state;
  }
};
