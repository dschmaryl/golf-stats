import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Rounds } from './components/Rounds/Rounds';
import { Stats } from './components/Stats/Stats';

const ContainerDiv = styled.div`
  max-width: 900px;
  min-width: 340px;
`;

const PaddedDiv = styled.div`
  padding-top: 20px;
`;

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
      <ContainerDiv className="container">
        <header className="row">
          <div className="col-xs-12">
            <h3>all statistics:</h3>
          </div>
        </header>
        <PaddedDiv className="row">
          <div className="col-xs-12">
            <Stats
              userData={this.state.userData}
              onSeasonClick={season => this.onSeasonClick(season)}
            />
          </div>
        </PaddedDiv>
        <PaddedDiv className="row">
          <div className="col-xs-12">
            <Rounds
              userData={this.state.userData}
              selectedSeason={this.state.selectedSeason}
            />
          </div>
        </PaddedDiv>
      </ContainerDiv>
    );
  }
}
