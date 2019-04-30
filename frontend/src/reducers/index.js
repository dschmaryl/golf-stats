import { combineReducers } from 'redux';

import { auth } from './auth';
import { rounds } from './rounds';
import { stats } from './stats';

export default combineReducers({
  auth,
  rounds,
  stats
});
