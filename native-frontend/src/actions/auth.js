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
  if (validateToken(token)) {
    dispatch(loginSuccess(token));
  } else {
    dispatch(loginFailure('Invalid token'));
  }
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
