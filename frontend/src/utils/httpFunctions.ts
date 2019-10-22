import axios from 'axios';

const tokenConfig = (token: string) => ({
  headers: {
    'Authorization': token // prettier-ignore
  }
});

export const getToken = (username: string, password: string) =>
  axios.post('/api/get_token', { username, password });

export const validateToken = (token: string) =>
  axios.post('/api/is_token_valid', { token });

export const getData = (url: string, token: string) =>
  axios.get(url, tokenConfig(token));
