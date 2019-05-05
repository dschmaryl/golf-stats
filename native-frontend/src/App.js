import React from 'react';
import { View, Text } from 'react-native';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

import { checkToken } from './actions/auth';

import { Login } from './screens/Login';
import { Main } from './screens/Main';

persistor.purge();

export const url = '';

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

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);
