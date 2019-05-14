import { Reducer } from 'redux';

import { StatsStateType } from '../types/stats';

export const stats: Reducer = (
  state: StatsStateType = {
    statsLoaded: false,
    selectedSeason: null,
    data: {}
  },
  action
) => {
  switch (action.type) {
    case 'ADD_STATS':
      return { ...state, statsLoaded: true, data: { ...action.data } };

    case 'SELECT_SEASON':
      return {
        ...state,
        selectedSeason: action.season === '2046' ? null : action.season
      };

    default:
      return state;
  }
};
