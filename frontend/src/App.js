import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Login } from './components/Login';
import { Rounds } from './components/Rounds/Rounds';
import { Stats } from './components/Stats/Stats';

const ContainerDiv = styled.div`
  max-width: 720px;
  min-width: 340px;
  margin: auto;
  padding: 0;
`;

const PaddedDiv = styled.div`
  padding-top: 20px;
`;

const Header = styled.div`
  text-align: center;
`;

export class App extends React.Component {
  state = { requestFailed: false };

  componentDidMount = () =>
    axios
      .get('/api/my_info')
      .then(userData => {
        if (userData.data.error === 'not authorized') {
          this.setState({ notAuthorized: true });
        } else if (userData.data['error']) {
          this.setState({ requestFailed: true });
        } else {
          this.setState({ userData: userData.data });
        }
      })
      .catch(() => this.setState({ requestFailed: true }));

  onSeasonClick = season => this.setState({ selectedSeason: season });

  render() {
    if (!this.state.userData) {
      if (this.state.notAuthorized) {
        return <Login />;
      } else if (this.state.requestFailed) {
        return <p>Failed to retrieve user data</p>;
      } else {
        return <p>Loading user data...</p>;
      }
    }

    return (
      <ContainerDiv className="container">
        <Header className="row">
          <div className="col-xs-12">
            <h3>all statistics</h3>
          </div>
        </Header>
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
