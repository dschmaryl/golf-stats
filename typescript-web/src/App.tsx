import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { checkToken } from './actions/auth';

import { AppStateType } from './types';
import { token } from './types/auth';

import { Login } from './screens/Login';
import { Main } from './screens/Main';

type PropTypes = {
  token: token;
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  checkToken: Function;
};

const AppComponent: React.FC<PropTypes> = ({
  token,
  isAuthenticated,
  authenticationFailed,
  checkToken
}) => {
  if (token && isAuthenticated) {
    return <Main />;
  } else if (!token || authenticationFailed) {
    return <Login />;
  } else {
    checkToken();
    return (
      <div>
        <p>authenticating...</p>
      </div>
    );
  }
};

const mapStateToProps = (state: AppStateType) => ({
  token: state.token,
  isAuthenticated: state.auth.isAuthenticated,
  authenticationFailed: state.auth.authenticationFailed
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkToken: () => dispatch(checkToken())
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
