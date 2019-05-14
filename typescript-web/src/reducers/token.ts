import { Reducer } from 'redux';

import { TokenStateType, TokenActionTypes } from '../types/auth';

export const token: Reducer = (
  state: TokenStateType = null,
  action: TokenActionTypes
) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;

    case 'CLEAR_TOKEN':
      return null;

    default:
      return state;
  }
};
