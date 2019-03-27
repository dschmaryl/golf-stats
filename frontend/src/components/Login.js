import React from 'react';
import axios from 'axios';
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
  state = { username: '', password: '' };

  handleSubmit = event => {
    if (this.state.username) {
      const formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);

      axios
        .post({
          method: 'post',
          url: '/api/login',
          data: formData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
        .then()
        .catch();
    }
  };

  render = () => (
    <LoginContainer>
      <Header>
        <div>welcome</div>
      </Header>
      <form onSubmit={this.handleSubmit}>
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
          <input type="submit" value="login" className="btn btn-default" />
        </InputRow>
      </form>
    </LoginContainer>
  );
}
