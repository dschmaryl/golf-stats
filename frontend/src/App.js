import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Rounds } from './components/Rounds/Rounds';
import { Stats } from './components/Stats/Stats';

const ContainerDiv = styled.div`
  max-width: 720px;
  min-width: 340px;
  margin: auto;
`;

const PaddedDiv = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Header = styled.div`
  text-align: center;
`;

const ErrorDiv = styled.div`
  padding: 10%;
`;

export class App extends React.Component {
  state = { requestFailed: false };

  componentDidMount = () =>
    axios
      .get('/api/my_info')
      .then(userData =>
        userData.data.error === 'not authorized'
          ? this.setState({ notAuthorized: true })
          : userData.data['error']
          ? this.setState({ requestFailed: true })
          : this.setState({ userData: userData.data })
      )
      .catch(() => this.setState({ requestFailed: true }));

  onSeasonClick = season => this.setState({ selectedSeason: season });

  render = () =>
    !this.state.userData ? (
      <ErrorDiv className="container">
        {this.state.notAuthorized
          ? 'Not authorized'
          : this.state.requestFailed
          ? 'Failed to retrieve user data'
          : 'Loading user data...'}
      </ErrorDiv>
    ) : (
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
