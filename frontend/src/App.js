import React from 'react';
import axios from 'axios';
import './index.css';
import { Rounds } from './components/Rounds';
import { Stats } from './components/Stats';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('/api/my_info')
      .then(userData => {
        if (userData.data['error']) {
          this.setState({requestFailed: true});
        } else {
          this.setState({userData: userData.data});
          axios.get('/api/user/' + userData.data['id'] + '/stats')
            .then(statsData => {
              if (statsData['error']) {
                this.setState({requestFailed: true});
              } else {
                this.setState({statsData: statsData.data});
              }
            })
            .catch(() => this.setState({requestFailed: true}));
          axios.get('/api/user/' + userData.data['id'] + '/rounds')
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
      axios.get('/api/round/' + roundId)
        .then(roundData => this.setState({
          roundData: roundData.data,
          selectedRound: roundData.data['id']
        }))
        .catch(() => this.setState({requestFailed: true}));
    } else {
      this.setState({selectedRound: roundId})
    }
  }

  clickedSelected() {
    this.setState({selectedRound: null});
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
      <div className="row">
        <div className="col-xs-12">
          <h3>all statistics:</h3>
          <Stats
            statsData={this.state.statsData}
            onClick={stat => this.logIt(stat)}
          />
          <br />
          <Rounds
            roundsData={this.state.roundsData}
            selectedRound={this.state.selectedRound}
            roundData={this.state.roundData}
            onClick={roundId => this.fetchRound(roundId)}
            clickedSelected={() => this.clickedSelected()}
          />
        </div>
      </div>
    );
  }
}
