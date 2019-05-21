import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { showRoundDialog } from '../../../actions/rounds';

import { AppStateType } from '../../../types';
import { RoundsType } from '../../../types/rounds';

import { styles } from './styles';

interface PropTypes {
  rounds: RoundsType;
  sortKey: string;
  reverseSort: boolean;
  selectedSeason: number;
  showRoundDialog: Function;
}

const RoundsListComponent: React.FC<PropTypes> = props => (
  <TableBody>
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

        return (
          <TableRow
            key={key}
            onClick={() => props.showRoundDialog(key)}
            style={{ cursor: 'pointer' }}
            hover
          >
            <TableCell style={styles.dateCell}>
              {round['date'].split(' ')[0]}
            </TableCell>
            <TableCell style={styles.courseCell}>{round['course']}</TableCell>
            <TableCell style={styles.narrowCell} align="right">
              {round['total_strokes']}
            </TableCell>
            <TableCell style={styles.narrowCell} align="right">
              {round['front_9_strokes']}
            </TableCell>
            <TableCell style={styles.narrowCell} align="right">
              {round['back_9_strokes']}
            </TableCell>
            <TableCell style={styles.narrowCell} align="right">
              {round['total_putts']}
            </TableCell>
            <TableCell style={styles.narrowCell} align="right">
              {round['total_gir']}
            </TableCell>
            <TableCell style={styles.narrowCell} align="right">
              {round['handicap_index']}
            </TableCell>
          </TableRow>
        );
      })}
  </TableBody>
);

const mapStateToProps = (state: AppStateType) => ({
  rounds: state.rounds.data,
  sortKey: state.rounds.sortKey,
  reverseSort: state.rounds.reverseSort,
  selectedSeason: state.stats.selectedSeason
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  showRoundDialog: (roundIndex: number) => dispatch(showRoundDialog(roundIndex))
});

export const RoundsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsListComponent);
