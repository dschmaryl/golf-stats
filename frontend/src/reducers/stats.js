export const stats = (
  state = { statsLoaded: false, selectedSeason: null, data: {} },
  action
) => {
  switch (action.type) {
    case 'ADD_STATS':
      return { ...state, statsLoaded: true, data: { ...action.data } };

    case 'SELECT_SEASON':
      return { ...state, selectedSeason: action.season };

    default:
      return state;
  }
};
