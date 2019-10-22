// import { AuthStateType, TokenStateType, AuthActionTypes } from './auth';
import { AuthStateType, AuthActionTypes } from './auth/types';
import { RoundsStateType } from './rounds/types';
import { StatsStateType } from './stats/types';

export interface AppStateType {
  auth: AuthStateType;
  rounds: RoundsStateType;
  stats: StatsStateType;
  // token: TokenStateType;
}

export type ActionTypes = AuthActionTypes;
// export type CheckTokenType = { type: ''}
