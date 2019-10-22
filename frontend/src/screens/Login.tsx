import React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { login } from '../store/auth/actions';
import { AppStateType } from '../store/types';

const styles = {
  loginContainer: {
    width: '200px',
    margin: 'auto',
    paddingTop: '10%',
    paddingRight: '10%'
  },
  rowContainer: {
    marginBottom: '20px'
  }
};

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
    <div style={styles.loginContainer} onKeyDown={this.handleKeyPress}>
      <h2>welcome</h2>
      <h5>{this.props.statusText}</h5>
      <div style={styles.rowContainer}>
        <TextField
          label="username"
          value={this.state.username}
          placeholder="name"
          onChange={event => this.setState({ username: event.target.value })}
        />
      </div>
      <div style={styles.rowContainer}>
        <TextField
          label="password"
          type="password"
          autoComplete="current-password"
          value={this.state.password}
          placeholder="password"
          onChange={event => this.setState({ password: event.target.value })}
        />
      </div>

      <div style={styles.rowContainer}>
        <Button
          variant="outlined"
          style={{ marginTop: '10px' }}
          onClick={this.login}
        >
          login
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: '10px', marginTop: '10px' }}
          onClick={() => {}}
        >
          register
        </Button>
      </div>
    </div>
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
