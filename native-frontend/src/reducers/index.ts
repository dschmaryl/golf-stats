import { combineReducers } from 'redux';

import { auth } from './auth';
import { rounds } from './rounds';
import { stats } from './stats';
import { token } from './token';

export default combineReducers({
  auth,
  rounds,
  stats,
  token
});
