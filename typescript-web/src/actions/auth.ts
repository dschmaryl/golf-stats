import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppStateType } from '../types';
import { getToken, validateToken } from '../utils/httpFunctions';

export const loginSuccess = () => ({
  type: 'LOGIN_SUCCESS'
});

export const loginFailure = (error: string) => ({
  type: 'LOGIN_FAILURE',
  error
});

export const checkToken = (): ThunkAction<
  void,
  AppStateType,
  null,
  AnyAction
> => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState) => {
  const token = getState().token;
  validateToken(token)
    .then(response => response.data)
    .then(response => {
      if (response) {
        return dispatch(loginSuccess());
      } else {
        dispatch({ type: 'CLEAR_TOKEN' });
        return dispatch(loginFailure('Invalid token'));
      }
    })
    .catch(() => dispatch(loginFailure('Invalid token')));
};

export const login = (
  username: string,
  password: string
): ThunkAction<void, AppStateType, null, AnyAction> => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  getToken(username, password)
    .then(response => response.data)
    .then(response => {
      dispatch({ type: 'SET_TOKEN', token: response.token });
      dispatch(loginSuccess());
    })
    .catch(() => {
      dispatch(loginFailure('Invalid username or password'));
    });
};

export const logout = (): ThunkAction<void, AppStateType, null, AnyAction> => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({ type: 'CLEAR_TOKEN' });
  return { type: 'LOGOUT' };
};
