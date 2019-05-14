import { AuthStateType, TokenStateType, AuthActionTypes } from './auth';
import { RoundsStateType } from './rounds';
import { StatsStateType } from './stats';

export interface AppStateType {
  auth: AuthStateType;
  rounds: RoundsStateType;
  stats: StatsStateType;
  token: TokenStateType;
}

export type ActionTypes = AuthActionTypes;
// export type CheckTokenType = { type: ''}
