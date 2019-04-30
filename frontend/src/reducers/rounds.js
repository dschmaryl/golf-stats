export const rounds = (
  state = { roundsLoaded: false, sortKey: 'date', reverseSort: true, data: {} },
  action
) => {
  switch (action.type) {
    case 'ADD_ROUNDS':
      return { ...state, roundsLoaded: true, data: { ...action.data } };

    case 'SET_SORT_KEY':
      return { ...state, sortKey: action.sortKey };

    case 'TOGGLE_SORT_ORDER':
      return { ...state, reverseSort: !state.reverseSort };

    default:
      return state;
  }
};
