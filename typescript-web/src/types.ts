import { rootReducer } from './reducers';

// export interface Round {
//   score: number;
//   rating: number;
//   slope: number;
// }

// export type Rounds = Round[];

// export interface State {
//   rounds: Rounds;
//   handicap: number;
// }

export interface AuthStateType {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  statusText: string;
}

export interface RoundsStateType {
  roundsLoaded: boolean;
  sortKey: string;
  reverseSort: boolean;
  selectedRoundIndex: null | number;
  data: any;
}

export interface StatsStateType {
  statsLoaded: boolean;
  selectedSeason: null | string;
  data: any;
}

export type token = null | string;

export type TokenStateType = token;

// export type AppStateType = ReturnType<typeof rootReducer>;
export interface AppStateType {
  auth: AuthStateType;
  rounds: RoundsStateType;
  stats: StatsStateType;
  token: TokenStateType;
}

export type LoginSuccessType = { type: 'LOGIN_SUCCESS' };
export type LoginFailureType = { type: 'LOGIN_FAILURE'; error: string };
// export type CheckTokenType = { type: ''}
