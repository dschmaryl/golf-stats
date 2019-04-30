import axios from 'axios';

const tokenConfig = token => ({
  headers: {
    'Authorization': token // prettier-ignore
  }
});

export const getToken = (username, password) =>
  axios.post('/api/get_token', { username, password });

export const validateToken = token =>
  axios.post('/api/is_token_valid', { token });

export const getData = (url, token) => axios.get(url, tokenConfig(token));
