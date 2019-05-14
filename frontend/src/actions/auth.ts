import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppStateType } from '../types';
import { getToken, validateToken } from '../utils/httpFunctions';

export const checkToken = (): ThunkAction<
  void,
  AppStateType,
  null,
  AnyAction
> => (dispatch, getState) => {
  const token = getState().token;
  validateToken(token)
    .then(response => response.data)
    .then(response => {
      if (response) {
        return dispatch({
          type: 'LOGIN_SUCCESS'
        });
      } else {
        dispatch({ type: 'CLEAR_TOKEN' });
        return dispatch({
          type: 'LOGIN_FAILURE',
          error: 'Invalid token'
        });
      }
    })
    .catch(() =>
      dispatch({
        type: 'LOGIN_FAILURE',
        error: 'Invalid token'
      })
    );
};

export const login = (
  username: string,
  password: string
): ThunkAction<void, AppStateType, null, AnyAction> => dispatch =>
  getToken(username, password)
    .then(response => response.data)
    .then(response => {
      dispatch({ type: 'SET_TOKEN', token: response.token });
      return dispatch({
        type: 'LOGIN_SUCCESS'
      });
    })
    .catch(() => {
      dispatch({
        type: 'LOGIN_FAILURE',
        error: 'Invalid username or password'
      });
    });

export const logout = (): ThunkAction<void, AppStateType, null, AnyAction> => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({ type: 'CLEAR_TOKEN' });
  return { type: 'LOGOUT' };
};
