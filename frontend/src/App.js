import React from 'react';
import axios from 'axios';
import './index.css';
import { RoundList } from './components/RoundList';

// const apiURL = '/api';
const apiURL = 'http://localhost:5000/api';

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

  fetchRound(roundId) {
    if (!this.state.roundData || this.state.roundData['id'] !== roundId) {
      axios.get(apiURL + '/round/' + roundId)
        .then(roundData => this.setState({
          roundData: roundData.data,
          msg: 'received data for round ' + roundId
        }))
        .catch(() => this.setState({requestFailed: true}));
    }
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
        <p>{this.state.msg}</p>
        <h2>all rounds:</h2>
        <RoundList
          roundsData={this.state.roundsData}
          onClick={roundId => this.fetchRound(roundId)}
        />
      </div>
    );
  }
}
