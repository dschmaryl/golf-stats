import axios from 'axios';

import { token } from '../types';

const tokenConfig = (token: token) => ({
  headers: {
    'Authorization': token // prettier-ignore
  }
});

export const getToken = (username: string, password: string) =>
  axios.post('/api/get_token', { username, password });

export const validateToken = (token: token) =>
  axios.post('/api/is_token_valid', { token });

export const getData = (url: string, token: token) =>
  axios.get(url, tokenConfig(token));
