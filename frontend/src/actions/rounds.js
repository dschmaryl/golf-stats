import { getData } from '../utils/httpFunctions';

export const addRounds = () => (dispatch, getState) => {
  getData('/api/user/rounds', getState().auth.token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_ROUNDS', data }))
    .catch(() => console.log('failed to get rounds'));
};

export const setSortKey = sortKey => ({ type: 'SORT_BY', sortKey });

export const toggleSortOrder = () => ({ type: 'TOGGLE_SORT_ORDER' });
