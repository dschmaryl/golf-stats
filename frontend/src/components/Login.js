import React from 'react';
import styled from 'styled-components';

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

export class Login extends React.Component {
  state = { name: '', password: '' };

  render = () => (
    <LoginContainer>
      <Header>
        <div>welcome</div>
      </Header>
      <InputRow>
        <input
          type="text"
          className="form-control text-input"
          value={this.state.name}
          placeholder="name"
          onChange={event => this.setState({ name: event.target.value })}
        />
      </InputRow>
      <InputRow>
        <input
          type="password"
          className="form-control text-input"
          value={this.state.password}
          placeholder="password"
          onChange={event => this.setState({ password: event.target.value })}
        />
      </InputRow>
      <InputRow>
        <input type="submit" value="login" className="btn btn-default" />
      </InputRow>
    </LoginContainer>
  );
}
