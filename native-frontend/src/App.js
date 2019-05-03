import React from 'react';
import { connect } from 'react-redux';

import { checkToken } from './actions/auth';

import { Login } from './screens/Login';
import { Main } from './screens/Main';

class AppComponent extends React.Component {
  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        this.props.checkToken(token);
      }
    }
  };

  render = () => (!this.props.isAuthenticated ? <Login /> : <Main />);
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  checkToken: token => dispatch(checkToken(token))
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
