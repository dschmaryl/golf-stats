import { AnyAction, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import { AppStateType } from '../types';
import { DecodedToken } from '../types/auth';
import { getToken, validateToken } from '../utils/httpFunctions';

export const checkToken: ActionCreator<
  ThunkAction<void, AppStateType, null, AnyAction>
> = () => (dispatch, getState) =>
  validateToken(getState().token)
    .then(response => response.data)
    .then(response => {
      if (response) {
        const username = jwtDecode<DecodedToken>(getState().token)['username'];
        return dispatch({ type: 'LOGIN_SUCCESS', username });
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
      return dispatch({ type: 'LOGIN_SUCCESS', username });
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
