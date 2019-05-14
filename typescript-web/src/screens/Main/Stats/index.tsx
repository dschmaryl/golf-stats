import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { selectSeason } from '../../../actions/stats';

import { AppStateType } from '../../../types';
import { StatsType } from '../../../types/stats';

import { PaddedDiv } from '../../../components/PaddedDiv';

import { StatsHeader } from './StatsHeader';
import { StatsList } from './StatsList';

interface PropTypes {
  statsLoaded: boolean;
  stats: StatsType;
  selectSeason: Function;
}

export const StatsComponent: React.FC<PropTypes> = ({
  statsLoaded,
  stats,
  selectSeason
}) => {
  if (!statsLoaded) {
    return <p>loading stats...</p>;
  } else {
    const seasons = Object.keys(stats)
      .map(s => parseInt(s))
      .sort()
      .reverse();

    return (
      <PaddedDiv className="row">
        <div className="col-xs-12">
          <table style={{ width: '100%' }}>
            <StatsHeader seasons={seasons} onClick={selectSeason} />
            <StatsList seasons={seasons} stats={stats} onClick={selectSeason} />
          </table>
        </div>
      </PaddedDiv>
    );
  }
};

const mapStateToProps = (state: AppStateType) => ({
  statsLoaded: state.stats.statsLoaded,
  stats: state.stats.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  selectSeason: (season: number) => dispatch(selectSeason(season))
});

export const Stats = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsComponent);
