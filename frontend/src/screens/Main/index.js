import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { addRounds } from '../../actions/rounds';
import { addStats } from '../../actions/stats';

import { Rounds } from './Rounds';
import { Stats } from './Stats';

const ContainerDiv = styled.div`
  max-width: 720px;
  min-width: 480px;
  margin: auto;
`;

const Header = styled.div`
  text-align: center;
`;

class MainComponent extends React.Component {
  componentDidMount = () => {
    if (this.props.stats.length === undefined) {
      console.log('getting stats');
      this.props.addStats();
    }
    if (this.props.rounds.length === undefined) {
      console.log('getting rounds');
      this.props.addRounds();
    }
  };

  render = () => (
    <ContainerDiv className="container">
      <Header className="row">
        <div className="col-xs-12">
          <h3>all statistics</h3>
        </div>
      </Header>
      <Stats />
      <Rounds />
    </ContainerDiv>
  );
}

const mapStateToProps = state => ({
  rounds: state.rounds.data,
  stats: state.stats.data
});

const mapDispatchToProps = dispatch => ({
  addRounds: () => dispatch(addRounds()),
  addStats: () => dispatch(addStats())
});

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
