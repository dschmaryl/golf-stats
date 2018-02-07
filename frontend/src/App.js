import React from 'react';
import axios from 'axios';
import { Rounds } from './components/Rounds/Rounds';
import { Stats } from './components/Stats/Stats';

import './App.css';

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
        }
      })
      .catch(() => this.setState({requestFailed: true}));
  }

  onSeasonClick(season) {
    this.setState({selectedSeason: season});
  }

  render() {
    if (!this.state.userData) {
      if (this.state.requestFailed) {
        return <p>Failed to retrieve user data</p>;
      } else {
        return <p>Loading user data...</p>;
      }
    }

    return (
      <div className="container">
        <header className="row">
          <div className="col-xs-12">
            <h3>all statistics:</h3>
          </div>
        </header>
        <div className="row extra-padding-top">
          <div className="col-xs-12">
            <Stats
              userData={this.state.userData}
              onSeasonClick={season => this.onSeasonClick(season)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 extra-padding-top">
            <Rounds
              userData={this.state.userData}
              selectedSeason={this.state.selectedSeason}
            />
          </div>
        </div>
      </div>
    );
  }
}
