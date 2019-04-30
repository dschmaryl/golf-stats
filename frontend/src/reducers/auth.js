export const auth = (
  state = { token: null, isAuthenticated: false, statusText: null },
  action
) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        token: action.token,
        isAuthenticated: true,
        statusText: 'You are logged in.'
      };

    case 'LOGIN_FAILURE':
      return {
        token: null,
        isAuthenticated: false,
        statusText: `Error logging in: ${action.error}`
      };

    case 'LOGOUT':
      return {
        token: null,
        isAuthenticated: false,
        statusText: 'You are logged out.'
      };

    default:
      return state;
  }
};
