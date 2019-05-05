import { getToken, validateToken } from '../utils/httpFunctions';

export const loginSuccess = token => {
  localStorage.setItem('token', token);
  return { type: 'LOGIN_SUCCESS', token };
};

export const loginFailure = error => {
  localStorage.removeItem('token');
  return { type: 'LOGIN_FAILURE', error };
};

export const checkToken = token => dispatch => {
  validateToken(token)
    .then(response => response.data)
    .then(response => {
      if (response) {
        return dispatch(loginSuccess(token));
      } else {
        dispatch({ type: 'CLEAR_TOKEN' });
        return dispatch(loginFailure('Invalid token'));
      }
    })
    .catch(() => dispatch(loginFailure('Invalid token')));
};

export const login = (username, password) => dispatch => {
  getToken(username, password)
    .then(response => response.data)
    .then(response => {
      try {
        dispatch(loginSuccess(response.token));
      } catch (error) {
        dispatch(loginFailure('Invalid token'));
      }
    })
    .catch(() => {
      dispatch(loginFailure('Invalid username or password'));
    });
};

export const logout = () => ({ type: 'LOGOUT' });
