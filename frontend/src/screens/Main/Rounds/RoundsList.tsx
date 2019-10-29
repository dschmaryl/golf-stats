import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { showRoundDialog } from '../../../store/rounds/actions';
import { AppStateType } from '../../../store/types';
import { RoundsType } from '../../../store/rounds/types';

import { styles } from './styles';

const Cell = ({ text }: { text: number }) => (
  <TableCell style={styles.narrowCell} align="right">
    {text}
  </TableCell>
);

interface PropTypes {
  rounds: RoundsType;
  sortKey: string;
  reverseSort: boolean;
  selectedSeason: number;
  showRoundDialog: Function;
}

const RoundsListComponent: React.FC<PropTypes> = ({
  rounds,
  sortKey,
  reverseSort,
  selectedSeason,
  showRoundDialog
}) => (
  <TableBody>
    {Object.keys(rounds)
      .map(key => parseInt(key))
      .filter(
        key =>
          selectedSeason === 2046 ||
          rounds[key].date.split('-')[0] === '' + selectedSeason
      )
      .sort((a, b) => {
        if (sortKey === 'date') {
          return moment(rounds[reverseSort ? b : a]['date']).diff(
            moment(rounds[reverseSort ? a : b]['date'])
          );
        } else {
          const first = rounds[reverseSort ? b : a][sortKey];
          const second = rounds[reverseSort ? a : b][sortKey];
          return first > second ? 1 : -1;
        }
      })
      .map(key => {
        const round = rounds[key];

        return (
          <TableRow
            key={key}
            onClick={() => showRoundDialog(key)}
            style={{ cursor: 'pointer' }}
            hover
          >
            <TableCell style={styles.dateCell}>
              {round['date'].split(' ')[0]}
            </TableCell>
            <TableCell style={styles.courseCell}>{round['course']}</TableCell>
            <Cell text={round['total_strokes']} />
            <Cell text={round['front_9_strokes']} />
            <Cell text={round['back_9_strokes']} />
            <Cell text={round['total_putts']} />
            <Cell text={round['total_gir']} />
            <Cell text={round['handicap_index']} />
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
