import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../types';
import { getData } from '../utils/httpFunctions';

export const addStats: ActionCreator<
  ThunkAction<void, AppStateType, null, Action>
> = () => (dispatch: Dispatch, getState) => {
  getData('/api/user/stats', getState().token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_STATS', data }))
    .catch(() => console.log('failed to get stats'));
};

export const selectSeason: ActionCreator<Action> = (season: string) => ({
  type: 'SELECT_SEASON',
  season
});
