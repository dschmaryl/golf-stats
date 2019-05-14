import React from 'react';
import styled from 'styled-components';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { login } from '../actions/auth';
import { AppStateType } from '../types';

const LoginContainer = styled.div`
  min-width: 320px;
  max-width: 420px;
  padding: 10% 0 0 20%;
`;

const Header = styled.div`
  font-size: 3em;
`;

const InputRow = styled.div`
  margin: 20px 0 20px 0;
`;

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
    <LoginContainer onKeyPress={this.handleKeyPress}>
      <Header>
        <div>welcome</div>
      </Header>
      <div>
        <h5>{this.props.statusText}</h5>
      </div>
      <form>
        <InputRow>
          <input
            name="username"
            type="text"
            className="form-control text-input"
            value={this.state.username}
            placeholder="name"
            onChange={event => this.setState({ username: event.target.value })}
          />
        </InputRow>
        <InputRow>
          <input
            name="password"
            type="password"
            className="form-control text-input"
            value={this.state.password}
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
        </InputRow>

        <InputRow>
          <input
            type="submit"
            value="login"
            className="btn btn-default"
            onClick={this.login}
          />
          <input
            type="submit"
            value="register"
            className="btn btn-default"
            onClick={() => {}}
          />
        </InputRow>
      </form>
    </LoginContainer>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  statusText: state.auth.statusText
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  login: (username: string, password: string) =>
    dispatch(login(username, password))
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
