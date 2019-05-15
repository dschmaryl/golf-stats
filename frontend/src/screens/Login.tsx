import React from 'react';
import styled from 'styled-components';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { login } from '../actions/auth';
import { AppStateType } from '../types';

const LoginContainer = styled.div`
  width: 180px;
  margin: 20% 0 0 20%;
`;

const Header = styled.div`
  font-size: 3em;
`;

const InputRow = styled.div`
  margin: 20px 0 20px 0;
`;

const Button = styled.input`
  min-width: 80px;
`;

const ButtonRight = styled.input`
  margin-left: 20px;
  min-width: 80px;
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
    this.props.login(this.state.username, this.state.password);
  };

  render = () => (
    <LoginContainer onKeyDown={this.handleKeyPress}>
      <Header>
        <div>welcome</div>
      </Header>
      <div>
        <h5>{this.props.statusText}</h5>
      </div>
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
        <Button
          type="submit"
          value="login"
          className="btn btn-default"
          onClick={this.login}
        />
        <ButtonRight
          type="submit"
          value="register"
          className="btn btn-default"
          onClick={() => {}}
        />
      </InputRow>
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
