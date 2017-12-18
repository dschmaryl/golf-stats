import React from 'react';
import axios from 'axios';
import './index.css';
import { Rounds } from './components/Rounds';
import { Stats } from './components/Stats';

const apiURL = '/api';
// const apiURL = 'http://localhost:5000/api';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false, selectedRound: null};
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
          axios.get(apiURL + '/user/' + userId.data.id + '/stats')
            .then(statsData => {
              if (statsData['error']) {
                this.setState({requestFailed: true});
              } else {
                this.setState({statsData: statsData.data});
              }
            })
            .catch(() => this.setState({requestFailed: true}));
          axios.get(apiURL + '/user/' + userId.data.id + '/rounds')
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

  fetchRound(roundId) {
    if (!this.state.roundData || this.state.roundData.id !== roundId) {
      axios.get(apiURL + '/round/' + roundId)
        .then(roundData => this.setState({
          roundData: roundData.data,
          selectedRound: roundData.data['id'],
          msg: 'received data for round ' + roundData.data['id']
        }))
        .catch(() => this.setState({requestFailed: true}));
    }
  }

  logIt(value) {
    this.setState({msg: value});
  }

  render() {
    if (this.state.requestFailed) {
      return <p>Failed to retrieve data</p>;
    } else if (!this.state.userData) {
      return <p>Loading user data...</p>;
    } else if (!this.state.statsData) {
      return <p>Loading stats data...</p>
    } else if (!this.state.roundsData) {
      return <p>Loading round data...</p>
    }

    return (
      <div>
        <p>{this.state.msg}</p>
        <h2>all rounds</h2>
        <Stats
          statsData={this.state.statsData}
          onClick={stat => this.logIt(stat)}
        />
        <br />
        <Rounds
          roundsData={this.state.roundsData}
          selectedRound={this.state.selectedRound}
          onClick={roundId => this.fetchRound(roundId)}
        />
      </div>
    );
  }
}
