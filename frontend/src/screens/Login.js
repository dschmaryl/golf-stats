import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

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

export class LoginComponent extends React.Component {
  state = { username: '', password: '' };

  handleKeyPress = event => (event.key === 'Enter' ? this.login(event) : null);

  login = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render = () => (
    <LoginContainer onKeyPress={this.handleKeyPress}>
      <Header>
        <div>welcome</div>
      </Header>
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
            onClick={event => this.login(event)}
          />
        </InputRow>
      </form>
    </LoginContainer>
  );
}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export const Login = connect(
  null,
  mapDispatchToProps
)(LoginComponent);
