import React from 'react';
import axios from 'axios';
import './index.css';
import { Rounds } from './components/Rounds';
import { Stats } from './components/Stats';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false, rounds: {}};
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
    if (Object.keys(this.state.rounds).indexOf('' + roundId) !== -1) {
      this.setState({
        roundData: this.state.rounds[roundId],
        selectedRound: roundId
      });
    } else {
      axios.get('/api/round/' + roundId)
        .then(roundData => {
          let rounds = this.state.rounds;
          rounds[roundId] = roundData.data;
          this.setState({
            roundData: roundData.data,
            rounds: rounds,
            selectedRound: roundId
          });
        })
        .catch(() => this.setState({requestFailed: true}));
    }
  }

  clickedSelected() {
    this.setState({selectedRound: null});
  }

  clickedSeason(season) {
    this.setState({selectedSeason: season});
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
            clickedSeason={season => this.clickedSeason(season)}
          />
          <br />
          <Rounds
            roundsData={this.state.roundsData}
            selectedRound={this.state.selectedRound}
            selectedSeason={this.state.selectedSeason}
            roundData={this.state.roundData}
            onClick={roundId => this.fetchRound(roundId)}
            clickedSelected={() => this.clickedSelected()}
          />
        </div>
      </div>
    );
  }
}
