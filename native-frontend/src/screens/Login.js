import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

const styles = StyleSheet.create({
  loginContainer: {
    //
  },
  headerView: {
    //
  },
  headerText: {
    fontSize: 30
  }
});

export class LoginComponent extends React.Component {
  state = { username: '', password: '' };

  handleKeyPress = event => (event.key === 'Enter' ? this.login(event) : null);

  login = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render = () => (
    <View style={styles.loginContainer} onKeyPress={this.handleKeyPress}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>welcome</Text>
      </View>
      <View>
        <TextInput
          name="username"
          type="text"
          value={this.state.username}
          placeholder="name"
          onChangeText={text => this.setState({ username: text })}
        />
      </View>
      <View>
        <TextInput
          name="password"
          type="password"
          value={this.state.password}
          placeholder="password"
          onChangeText={text => this.setState({ password: text })}
        />
      </View>
      <View>
        <Button title="login" onPress={event => this.login(event)} />
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export const Login = connect(
  null,
  mapDispatchToProps
)(LoginComponent);
