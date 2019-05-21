import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Table from '@material-ui/core/Table';

import { selectSeason } from '../../../actions/stats';

import { AppStateType } from '../../../types';
import { StatsType } from '../../../types/stats';

import { StatsHeader } from './StatsHeader';
import { StatsList } from './StatsList';

interface PropTypes {
  statsLoaded: boolean;
  stats: StatsType;
  selectedSeason: number;
  selectSeason: Function;
}

export const StatsComponent: React.FC<PropTypes> = ({
  statsLoaded,
  stats,
  selectedSeason,
  selectSeason
}) => {
  const seasons = Object.keys(stats)
    .map(s => parseInt(s))
    .sort()
    .reverse();

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>statistics</h2>
      {!statsLoaded ? (
        <div style={{ padding: '10px' }}>
          <h5>loading stats...</h5>
        </div>
      ) : (
        <Table style={{ marginTop: '-10px' }}>
          <StatsHeader
            seasons={seasons}
            selectedSeason={selectedSeason}
            onClick={selectSeason}
          />
          <StatsList
            seasons={seasons}
            stats={stats}
            selectedSeason={selectedSeason}
            onClick={selectSeason}
          />
        </Table>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  statsLoaded: state.stats.statsLoaded,
  stats: state.stats.data,
  selectedSeason: state.stats.selectedSeason
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
