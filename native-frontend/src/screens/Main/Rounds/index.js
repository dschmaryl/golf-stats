import React from 'react';
import { View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import { setSortKey } from '../../../actions/rounds';

import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

export const RoundsComponent = ({ roundsLoaded, setSortKey }) => (
  <View style={{ paddingTop: 40 }}>
    {!roundsLoaded ? (
      <View>
        <Text>loading rounds...</Text>
      </View>
    ) : (
      <DataTable>
        <RoundsHeader onClick={value => setSortKey(value)} />
        <RoundsList />
      </DataTable>
    )}
  </View>
);

const mapStateToProps = state => ({
  roundsLoaded: state.rounds.roundsLoaded
});

const mapDispatchToProps = dispatch => ({
  setSortKey: key => dispatch(setSortKey(key))
});

export const Rounds = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsComponent);
