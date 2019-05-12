import { Reducer } from 'redux';

import { TokenStateType } from '../types';

export const token: Reducer = (state: TokenStateType = null, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;

    case 'CLEAR_TOKEN':
      return null;

    default:
      return state;
  }
};
