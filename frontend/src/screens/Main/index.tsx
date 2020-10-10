import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { addRounds } from '../../store/rounds/actions';
import { addStats } from '../../store/stats/actions';

import { AppStateType } from '../../store/types';
import { StatsType } from '../../store/stats/types';
import { RoundsType } from '../../store/rounds/types';

import { Rounds } from './Rounds';
import { Stats } from './Stats';

const styles = {
  mainContainer: {
    maxWidth: '720px',
    minWidth: '480px',
    margin: 'auto'
  },
  headerRow: {
    marginTop: '20px'
    // display: 'flex',
    // justifyContent: 'center'
  }
};

interface PropTypes {
  username: string;
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
    <div style={styles.mainContainer}>
      <div style={styles.headerRow}>
        <h1>hello {this.props.username}</h1>
      </div>
      <Stats />
      <Rounds />
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  username: state.auth.username,
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
