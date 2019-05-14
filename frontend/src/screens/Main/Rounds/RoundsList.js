import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';

import { selectRound } from '../../../actions/rounds';

import { SelectedRound } from './SelectedRound';

const ItemRight = styled.div`
  text-align: right;
`;

const RoundsListComponent = props =>
  Object.keys(props.rounds)
    .filter(
      key =>
        props.selectedSeason === 2046 ||
        props.rounds[key].date.split('-')[0] === '' + props.selectedSeason
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

      return key === props.selectedRoundIndex ? (
        <SelectedRound
          roundData={round.roundData}
          onClick={() => props.selectRound(null)}
          key={key}
        />
      ) : (
        <div
          className="row"
          onClick={() => props.selectRound(key)}
          style={{ cursor: 'pointer' }}
          key={key}
        >
          <div className="col-xs-3">{round['date'].split(' ')[0]}</div>
          <div className="col-xs-3">{round['course']}</div>
          <ItemRight className="col-xs-1">{round['total_strokes']}</ItemRight>
          <ItemRight className="col-xs-1">{round['front_9_strokes']}</ItemRight>
          <ItemRight className="col-xs-1">{round['back_9_strokes']}</ItemRight>
          <ItemRight className="col-xs-1">{round['total_putts']}</ItemRight>
          <ItemRight className="col-xs-1">{round['total_gir']}</ItemRight>
          <ItemRight className="col-xs-1">{round['handicap_index']}</ItemRight>
        </div>
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
