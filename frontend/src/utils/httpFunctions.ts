import axios from 'axios';

import { Token } from '../types/auth';

const tokenConfig = (token: Token) => ({
  headers: {
    'Authorization': token // prettier-ignore
  }
});

export const getToken = (username: string, password: string) =>
  axios.post('/api/get_token', { username, password });

export const validateToken = (token: Token) =>
  axios.post('/api/is_token_valid', { token });

export const getData = (url: string, token: Token) =>
  axios.get(url, tokenConfig(token));
