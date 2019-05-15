import { AnyAction, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../types';
import { getToken, validateToken } from '../utils/httpFunctions';

export const checkToken: ActionCreator<
  ThunkAction<void, AppStateType, null, AnyAction>
> = () => (dispatch, getState) =>
  validateToken(getState().token)
    .then(response => response.data)
    .then(response => {
      if (response) {
        return dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'CLEAR_TOKEN' });
        return dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid token' });
      }
    })
    .catch(() => dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid token' }));

export const login: ActionCreator<
  ThunkAction<void, AppStateType, null, AnyAction>
> = (username: string, password: string) => dispatch =>
  getToken(username, password)
    .then(response => response.data)
    .then(response => {
      dispatch({ type: 'SET_TOKEN', token: response.token });
      return dispatch({
        type: 'LOGIN_SUCCESS'
      });
    })
    .catch(() =>
      dispatch({
        type: 'LOGIN_FAILURE',
        error: 'Invalid username or password'
      })
    );

export const logout: ActionCreator<
  ThunkAction<void, AppStateType, null, AnyAction>
> = () => dispatch => {
  dispatch({ type: 'CLEAR_TOKEN' });
  return dispatch({ type: 'LOGOUT' });
};
