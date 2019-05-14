import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { addRounds } from '../../actions/rounds';
import { addStats } from '../../actions/stats';

import { AppStateType } from '../../types';
import { StatsType } from '../../types/stats';
import { RoundsType } from '../../types/rounds';

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

interface PropTypes {
  stats: StatsType;
  rounds: RoundsType;
  addStats: Function;
  addRounds: Function;
}

class MainComponent extends React.Component<PropTypes> {
  componentDidMount = () => {
    if (!this.props.stats[2046]) {
      console.log('getting stats');
      this.props.addStats();
    }
    if (!this.props.rounds[0]) {
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

const mapStateToProps = (state: AppStateType) => ({
  rounds: state.rounds.data,
  stats: state.stats.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  addRounds: () => dispatch(addRounds()),
  addStats: () => dispatch(addStats())
});

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
