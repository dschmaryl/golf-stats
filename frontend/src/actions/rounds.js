import { getData } from '../utils/httpFunctions';

export const addRounds = () => (dispatch, getState) => {
  getData('/api/user/rounds', getState().auth.token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_ROUNDS', data }))
    .catch(() => console.log('failed to get rounds'));
};

export const setSortKey = sortKey => ({ type: 'SET_SORT_KEY', sortKey });

export const toggleSortOrder = () => ({ type: 'TOGGLE_SORT_ORDER' });
