import { AnyAction, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import { AppStateType } from '../types';
import { DecodedTokenType } from './types';
import { getToken, validateToken } from '../../utils/httpFunctions';

export const checkToken: ActionCreator<ThunkAction<
	void,
	AppStateType,
	null,
	AnyAction
>> = () => (dispatch, getState) =>
	validateToken(getState().auth.token)
		.then((response) => response.data)
		.then((response) => {
			if (response) {
				const username = jwtDecode<DecodedTokenType>(getState().auth.token)[
					'username'
				];
				return dispatch({ type: 'LOGIN_SUCCESS', username });
			} else {
				return dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid token' });
			}
		})
		.catch(() => dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid token' }));

export const login: ActionCreator<ThunkAction<
	void,
	AppStateType,
	null,
	AnyAction
>> = (username: string, password: string) => (dispatch) =>
	getToken(username, password)
		.then((response) => response.data)
		.then((response) => {
			return dispatch({
				type: 'LOGIN_SUCCESS',
				username,
				token: response.token
			});
		})
		.catch(() =>
			dispatch({
				type: 'LOGIN_FAILURE',
				error: 'Invalid username or password'
			})
		);

export const logout: ActionCreator<AnyAction> = () => ({ type: 'LOGOUT' });
