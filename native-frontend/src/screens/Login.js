import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    alignSelf: 'stretch',
    padding: 40
  },
  titleView: {
    alignSelf: 'stretch',
    paddingBottom: 30
  },
  titleText: {
    fontSize: 30
  },
  statusTextView: {
    paddingBottom: 14
  },
  statusTextText: {
    fontSize: 14
  },
  input: {
    marginBottom: 6
  },
  button: {
    padding: 4,
    marginTop: 4,
    marginBottom: 6
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
    <View style={styles.mainContainer}>
      <View style={styles.loginContainer} onKeyPress={this.handleKeyPress}>
        <View style={styles.titleView}>
          <Title style={styles.titleText}>welcome</Title>
        </View>
        <View style={styles.statusTextView}>
          <Text style={styles.statusTextText}>{this.props.statusText}</Text>
        </View>
        <TextInput
          label="name"
          type="text"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          style={styles.input}
        />
        <TextInput
          label="password"
          type="password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={event => this.login(event)}
          style={styles.button}
        >
          login
        </Button>
        <Button
          mode="outlined"
          onPress={event => this.login(event)}
          style={styles.button}
        >
          register
        </Button>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  statusText: state.auth.statusText
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
