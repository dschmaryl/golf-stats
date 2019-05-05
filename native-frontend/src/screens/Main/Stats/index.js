import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';

import { selectSeason } from '../../../actions/stats';

import { StatsHeader } from './StatsHeader';
import { StatsList } from './StatsList';

export const StatsComponent = ({ statsLoaded, stats, selectSeason }) => {
  if (!statsLoaded) {
    return <p>loading stats</p>;
  } else {
    const seasons = Object.keys(stats)
      .sort()
      .reverse();

    return (
      <View>
        <DataTable>
          <StatsHeader
            seasons={seasons}
            onClick={season => selectSeason(season)}
          />
          <StatsList
            seasons={seasons}
            stats={stats}
            onClick={season => selectSeason(season)}
          />
        </DataTable>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  statsLoaded: state.stats.statsLoaded,
  stats: state.stats.data
});

const mapDispatchToProps = dispatch => ({
  selectSeason: season => dispatch(selectSeason(season))
});

export const Stats = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsComponent);
