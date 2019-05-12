import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { login } from '../actions/auth';
import { AppStateType } from '../types';

interface PropTypes {
  statusText: string;
  login: Function;
}

export class LoginComponent extends React.Component<PropTypes> {
  state = { username: '', password: '' };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) this.login();
  };

  login = () => {
    // event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render = () => (
    <div>
      <div>
        <h4>welcome</h4>
      </div>
      <div>
        <h5>{this.props.statusText}</h5>
      </div>
      <input
        name="username"
        type="text"
        value={this.state.username}
        onChange={event => this.setState({ username: event.target.value })}
      />
      <input
        name="password"
        type="password"
        value={this.state.password}
        onKeyDown={this.handleKeyPress}
        onChange={event => this.setState({ password: event.target.value })}
      />

      <input onClick={this.login}>login</input>
      <input onClick={this.login}>register</input>
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (username: string, password: string) =>
    dispatch(login(username, password))
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
