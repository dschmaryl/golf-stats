import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { checkToken } from './actions/auth';

import { Login } from './screens/Login';
import { Main } from './screens/Main';

const AppComponent = ({
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
      <View>
        <Text>authenticating...</Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  token: state.token,
  isAuthenticated: state.auth.isAuthenticated,
  authenticationFailed: state.auth.authenticationFailed
});

const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(checkToken())
});

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
