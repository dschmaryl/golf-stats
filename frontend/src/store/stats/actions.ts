import { AnyAction, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../types';
import { getData } from '../../utils/httpFunctions';

export const addStats: ActionCreator<
  ThunkAction<void, AppStateType, null, AnyAction>
> = () => (dispatch, getState) =>
  getData('/api/user/stats', getState().auth.token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_STATS', data }))
    .catch(() => console.log('failed to get stats'));

export const selectSeason: ActionCreator<AnyAction> = (season: string) => ({
  type: 'SELECT_SEASON',
  season
});
