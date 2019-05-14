import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { selectRound } from '../../../actions/rounds';

import { AppStateType } from '../../../types';
import { RoundsType } from '../../../types/rounds';

import { SelectedRound } from './SelectedRound';

const ItemRight = styled.div`
  text-align: right;
`;

interface PropTypes {
  rounds: RoundsType;
  sortKey: string;
  reverseSort: boolean;
  selectedSeason: number;
  selectedRoundIndex: null | number;
  selectRound: Function;
}

const RoundsListComponent: React.FC<PropTypes> = props => (
  <div>
    {Object.keys(props.rounds)
      .map(k => parseInt(k))
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
        } else {
          const first = props.rounds[props.reverseSort ? b : a][props.sortKey];
          const second = props.rounds[props.reverseSort ? a : b][props.sortKey];
          return first > second ? 1 : -1;
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
            <ItemRight className="col-xs-1">
              {round['front_9_strokes']}
            </ItemRight>
            <ItemRight className="col-xs-1">
              {round['back_9_strokes']}
            </ItemRight>
            <ItemRight className="col-xs-1">{round['total_putts']}</ItemRight>
            <ItemRight className="col-xs-1">{round['total_gir']}</ItemRight>
            <ItemRight className="col-xs-1">
              {round['handicap_index']}
            </ItemRight>
          </div>
        );
      })}
  </div>
);

const mapStateToProps = (state: AppStateType) => ({
  rounds: state.rounds.data,
  sortKey: state.rounds.sortKey,
  reverseSort: state.rounds.reverseSort,
  selectedSeason: state.stats.selectedSeason,
  selectedRoundIndex: state.rounds.selectedRoundIndex
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  selectRound: (roundIndex: number) => dispatch(selectRound(roundIndex))
});

export const RoundsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsListComponent);
