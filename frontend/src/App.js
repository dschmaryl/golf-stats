import React from 'react';
import axios from 'axios';
import './index.css';
import { Rounds } from './components/Rounds';

const apiURL = '/api';
// const apiURL = 'http://localhost:5000/api';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get(apiURL + '/my_user_id')
      .then(userId => {
        if (userId.data['error']) {
          this.setState({requestFailed: true});
        } else {
          axios.get(apiURL + '/user/' + userId.data.id)
            .then(userData => {
              if (userData['error']) {
                this.setState({requestFailed: true});
              } else {
                this.setState({userData: userData.data});
              }
            })
            .catch(() => this.setState({requestFailed: true}));
          axios.get(apiURL + '/user/' + userId.data.id + '/get_rounds')
            .then(roundsData => {
              if (roundsData['error']) {
                this.setState({requestFailed: true});
              } else {
                this.setState({roundsData: roundsData.data});
              }
            })
            .catch(() => this.setState({requestFailed: true}));
        }
      })
      .catch(() => this.setState({requestFailed: true}));
  }

  render() {
    if (this.state.requestFailed) {
      return <p>Failed to retrieve data</p>;
    }
    if (!this.state.userData || !this.state.roundsData) {
      return <p>Loading user data...</p>;
    }

    return (
      <div>
        <h2>rounds list for {this.state.userData.username}</h2>
        <Rounds roundsData={this.state.roundsData} />
      </div>
    );
  }
}
