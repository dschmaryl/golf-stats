export type AuthStateType = {
	isAuthenticated: boolean;
	authenticationFailed: boolean;
	statusText: string;
	username: string;
	token: string;
};

export type DecodedTokenType = {
	id: number;
	username: string;
};

type LoginSuccessType = {
	type: 'LOGIN_SUCCESS';
	username: string;
	token: string;
};
type LoginFailureType = { type: 'LOGIN_FAILURE'; error: string };
type Logout = { type: 'LOGOUT' };

export type AuthActionTypes = LoginSuccessType | LoginFailureType | Logout;
