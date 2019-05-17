import { Reducer } from 'redux';

import { RoundsStateType } from '../types/rounds';

export const rounds: Reducer = (
  state: RoundsStateType = {
    roundsLoaded: false,
    sortKey: 'date',
    reverseSort: true,
    selectedRoundIndex: null,
    data: {}
  },
  action
) => {
  switch (action.type) {
    case 'ADD_ROUNDS':
      return { ...state, roundsLoaded: true, data: { ...action.data } };

    case 'ADD_ROUND_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [action.roundIndex]: {
            ...state.data[action.roundIndex],
            roundData: { ...action.roundData }
          }
        }
      };

    case 'SELECT_ROUND':
      if (action.data) {
        return {
          ...state,
          selectedRoundIndex: action.roundIndex,
          data: {
            ...state.data,
            [action.roundIndex]: {
              ...state.data[action.roundIndex],
              roundData: { ...action.data }
            }
          }
        };
      } else {
        return { ...state, selectedRoundIndex: action.roundIndex };
      }

    case 'SET_SORT_KEY':
      if (action.sortKey === state.sortKey) {
        return { ...state, reverseSort: !state.reverseSort };
      } else {
        if (action.sortKey === 'date' || action.sortKey === 'total_gir') {
          return { ...state, reverseSort: true, sortKey: action.sortKey };
        } else {
          return { ...state, reverseSort: false, sortKey: action.sortKey };
        }
      }

    case 'TOGGLE_SORT_ORDER':
      return { ...state, reverseSort: !state.reverseSort };

    default:
      return state;
  }
};
