import { getData } from '../utils/httpFunctions';

export const addRounds = () => (dispatch, getState) => {
  getData('/api/user/rounds', getState().token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_ROUNDS', data }))
    .catch(() => console.log('failed to get rounds'));
};

export const addRoundData = roundId => (dispatch, getState) => {
  getData('/api/round/' + roundId, getState().token)
    .then(response => response.data)
    .then(data => dispatch({ type: 'ADD_ROUND_data', roundId, data }))
    .catch(() => console.log('failed to get rounds'));
};

export const selectRound = roundIndex => (dispatch, getState) => {
  if (roundIndex === null) {
    dispatch({ type: 'SELECT_ROUND', roundIndex });
  } else {
    const rounds = getState().rounds;
    if (rounds.data[roundIndex].roundData) {
      dispatch({ type: 'SELECT_ROUND', roundIndex });
    } else {
      getData('/api/round/' + rounds.data[roundIndex].id, getState().token)
        .then(response => response.data)
        .then(data => dispatch({ type: 'SELECT_ROUND', roundIndex, data }))
        .catch(() => console.log('failed to get round data'));
    }
  }
};

export const setSortKey = sortKey => ({ type: 'SET_SORT_KEY', sortKey });

export const toggleSortOrder = () => ({ type: 'TOGGLE_SORT_ORDER' });
