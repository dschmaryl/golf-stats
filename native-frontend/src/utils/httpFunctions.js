import axios from 'axios';

import { url } from '../App';

const tokenConfig = token => ({
  headers: {
    'Authorization': token // prettier-ignore
  }
});

export const getToken = (username, password) =>
  axios.post(url + '/api/get_token', { username, password });

export const validateToken = token =>
  axios.post(url + '/api/is_token_valid', { token });

export const getData = (urlExt, token) =>
  axios.get(url + urlExt, tokenConfig(token));
