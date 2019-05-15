export interface AuthStateType {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  statusText: string;
}

export type Token = null | string;

export type TokenStateType = Token;

type SetTokenType = { type: 'SET_TOKEN'; token: Token };
type ClearTokenType = { type: 'CLEAR_TOKEN' };

export type TokenActionTypes = SetTokenType | ClearTokenType;

type LoginSuccessType = { type: 'LOGIN_SUCCESS' };
type LoginFailureType = { type: 'LOGIN_FAILURE'; error: string };
type Logout = { type: 'LOGOUT' };

export type AuthActionTypes = LoginSuccessType | LoginFailureType | Logout;
