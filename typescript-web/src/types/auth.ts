export interface AuthStateType {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  statusText: string;
}

export type Token = null | string;

export type TokenStateType = Token;

export type SetTokenType = { type: 'SET_TOKEN'; token: Token };
export type ClearTokenType = { type: 'CLEAR_TOKEN' };

export type TokenActionTypes = SetTokenType | ClearTokenType;

export type LoginSuccessType = { type: 'LOGIN_SUCCESS' };
export type LoginFailureType = { type: 'LOGIN_FAILURE'; error: string };
export type Logout = { type: 'LOGOUT' };

export type AuthActionTypes = LoginSuccessType | LoginFailureType | Logout;
// export type CheckTokenType = { type: ''}
