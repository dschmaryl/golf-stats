import { AnyAction, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../types';
import { getData } from '../../utils/httpFunctions';
import { checkToken } from '../auth/actions';

export const addRounds: ActionCreator<ThunkAction<
	void,
	AppStateType,
	null,
	AnyAction
>> = () => (dispatch, getState) =>
	getData('/api/user/rounds', getState().auth.token)
		.then((response) => response.data)
		.then((data) => dispatch({ type: 'ADD_ROUNDS', data }))
		.catch(() => console.log('failed to get rounds'));

export const showRoundDialog: ActionCreator<ThunkAction<
	void,
	AppStateType,
	null,
	AnyAction
>> = (roundIndex: number) => (dispatch, getState) => {
	dispatch({ type: 'SHOW_ROUND_DIALOG', roundIndex });

	const rounds = getState().rounds.data;

	if (!rounds[roundIndex].roundData) {
		return getData('/api/round/' + rounds[roundIndex].id, getState().auth.token)
			.then((response) => response.data)
			.then((data) => dispatch({ type: 'ADD_ROUND_DATA', roundIndex, data }))
			.catch(() => {
				console.log('failed to get round data');
				dispatch(checkToken());
			});
	} else {
		return dispatch({ type: 'SET_SELECTED_ROUND_IS_LOADED' });
	}
};

export const hideRoundDialog: ActionCreator<AnyAction> = () => ({
	type: 'HIDE_ROUND_DIALOG'
});

export const setSortKey: ActionCreator<AnyAction> = (sortKey: string) => ({
	type: 'SET_SORT_KEY',
	sortKey
});

export const toggleSortOrder: ActionCreator<AnyAction> = () => ({
	type: 'TOGGLE_SORT_ORDER'
});
