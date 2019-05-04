import { getData } from '../utils/httpFunctions';

export const addStats = () => (dispatch, getState) => {
  getData('/api/user/stats', getState().token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_STATS', data }))
    .catch(() => console.log('failed to get stats'));
};

export const selectSeason = season => ({ type: 'SELECT_SEASON', season });
