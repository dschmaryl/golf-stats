import { Reducer } from 'redux';

import { RoundsStateType } from '../types/rounds';

export const rounds: Reducer = (
  state: RoundsStateType = {
    roundsLoaded: false,
    sortKey: 'date',
    reverseSort: true,
    selectedRoundIndex: 0,
    selectedRoundIsLoaded: false,
    showRoundDialog: false,
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
        selectedRoundIsLoaded: true,
        data: {
          ...state.data,
          [action.roundIndex]: {
            ...state.data[action.roundIndex],
            roundData: { ...action.data }
          }
        }
      };

    case 'SET_SELECTED_ROUND_IS_LOADED':
      return { ...state, selectedRoundIsLoaded: true };

    case 'SHOW_ROUND_DIALOG':
      return {
        ...state,
        showRoundDialog: true,
        selectedRoundIndex: action.roundIndex,
        selectedRoundIsLoaded: false
      };

    case 'HIDE_ROUND_DIALOG':
      return { ...state, showRoundDialog: false };

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
