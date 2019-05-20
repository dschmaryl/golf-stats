export interface AuthStateType {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  statusText: string;
  username: string;
}

export type Token = string;

export type TokenStateType = Token;

type SetTokenType = { type: 'SET_TOKEN'; token: Token };
type ClearTokenType = { type: 'CLEAR_TOKEN' };

export type TokenActionTypes = SetTokenType | ClearTokenType;

export interface DecodedToken {
  id: number;
  username: string;
}

type LoginSuccessType = { type: 'LOGIN_SUCCESS'; username: string };
type LoginFailureType = { type: 'LOGIN_FAILURE'; error: string };
type Logout = { type: 'LOGOUT' };

export type AuthActionTypes = LoginSuccessType | LoginFailureType | Logout;
