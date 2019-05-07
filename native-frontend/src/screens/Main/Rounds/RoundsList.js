import React from 'react';
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import { connect } from 'react-redux';

import { selectRound } from '../../../actions/rounds';

// import { SelectedRound } from './SelectedRound';

const RoundsListComponent = props =>
  Object.keys(props.rounds)
    .filter(
      key =>
        !props.selectedSeason ||
        props.rounds[key].date.split('-')[0] === props.selectedSeason
    )
    .sort((a, b) => {
      if (props.sortKey === 'date') {
        return moment(props.rounds[props.reverseSort ? b : a]['date']).diff(
          moment(props.rounds[props.reverseSort ? a : b]['date'])
        );
      } else if (props.sortKey === 'course') {
        const first = props.rounds[props.reverseSort ? b : a]['course'];
        const second = props.rounds[props.reverseSort ? a : b]['course'];
        return first > second ? 1 : -1;
      } else {
        return (
          props.rounds[props.reverseSort ? b : a][props.sortKey] -
          props.rounds[props.reverseSort ? a : b][props.sortKey]
        );
      }
    })
    .map(key => {
      const round = props.rounds[key];

      return key === props.selectedRoundIndex ? null : (
        // <SelectedRound
        //   roundData={round.roundData}
        //   onClick={() => props.selectRound(null)}
        //   key={key}
        // />
        <DataTable.Row
          onPress={() => props.selectRound(key)}
          style={{ cursor: 'pointer' }}
          key={key}
        >
          <DataTable.Cell>{round['date'].split(' ')[0]}</DataTable.Cell>
          <DataTable.Cell>{round['course']}</DataTable.Cell>
          <DataTable.Cell numeric>{round['total_strokes']}</DataTable.Cell>
          <DataTable.Cell numeric>{round['front_9_strokes']}</DataTable.Cell>
          <DataTable.Cell numeric>{round['back_9_strokes']}</DataTable.Cell>
          <DataTable.Cell numeric>{round['total_putts']}</DataTable.Cell>
          <DataTable.Cell numeric>{round['total_gir']}</DataTable.Cell>
          <DataTable.Cell numeric>{round['handicap_index']}</DataTable.Cell>
        </DataTable.Row>
      );
    });

const mapStateToProps = state => ({
  rounds: state.rounds.data,
  sortKey: state.rounds.sortKey,
  reverseSort: state.rounds.reverseSort,
  selectedSeason: state.stats.selectedSeason,
  selectedRoundIndex: state.rounds.selectedRoundIndex
});

const mapDispatchToProps = dispatch => ({
  selectRound: roundIndex => dispatch(selectRound(roundIndex))
});

export const RoundsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsListComponent);
