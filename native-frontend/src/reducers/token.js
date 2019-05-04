export const token = (state = null, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;

    case 'CLEAR_TOKEN':
      return null;

    default:
      return state;
  }
};
