export interface AuthStateType {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  statusText: string;
}

export type token = null | string;

export type TokenStateType = token;

export type LoginSuccessType = { type: 'LOGIN_SUCCESS' };
export type LoginFailureType = { type: 'LOGIN_FAILURE'; error: string };
export type Logout = { type: 'LOGOUT' };

export type AuthActionTypes = LoginSuccessType | LoginFailureType | Logout;
// export type CheckTokenType = { type: ''}
