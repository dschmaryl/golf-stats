import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../types';
import { getData } from '../utils/httpFunctions';

export const addRounds: ActionCreator<
  ThunkAction<void, AppStateType, null, Action>
> = () => (dispatch: Dispatch, getState) => {
  getData('/api/user/rounds', getState().token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_ROUNDS', data }))
    .catch(() => console.log('failed to get rounds'));
};

export const addRoundData: ActionCreator<
  ThunkAction<void, AppStateType, null, Action>
> = (roundId: number) => (dispatch: Dispatch, getState) => {
  getData('/api/round/' + roundId, getState().token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_ROUND_data', roundId, data }))
    .catch(() => console.log('failed to get rounds'));
};

export const selectRound: ActionCreator<
  ThunkAction<void, AppStateType, null, Action>
> = (roundIndex: number) => (dispatch: Dispatch, getState) => {
  if (roundIndex === null) {
    dispatch({ type: 'SELECT_ROUND', roundIndex });
  } else {
    const rounds = getState().rounds;
    if (rounds.data[roundIndex].roundData) {
      dispatch({ type: 'SELECT_ROUND', roundIndex });
    } else {
      getData('/api/round/' + rounds.data[roundIndex].id, getState().token)
        .then(response => response.data)
        .then(data => dispatch({ type: 'SELECT_ROUND', roundIndex, data }))
        .catch(() => console.log('failed to get round data'));
    }
  }
};

export const setSortKey: ActionCreator<Action> = (sortKey: string) => ({
  type: 'SET_SORT_KEY',
  sortKey
});

export const toggleSortOrder: ActionCreator<Action> = () => ({
  type: 'TOGGLE_SORT_ORDER'
});
