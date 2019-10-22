import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { setSortKey } from '../../../store/rounds/actions';

import { AppStateType } from '../../../store/types';

import { styles } from './styles';

interface PropTypes {
  sortKey: string;
  reverseSort: boolean;
  setSortKey: Function;
}

export const RoundsHeaderComponent: React.FC<PropTypes> = ({
  sortKey,
  reverseSort,
  setSortKey
}) => {
  const renderItem = (value: string, key: string) => (
    <TableCell
      align={value === 'date' || value === 'course' ? 'left' : 'right'}
      style={
        value === 'date'
          ? styles.dateCell
          : value === 'course'
          ? styles.courseCell
          : styles.narrowCell
      }
    >
      <TableSortLabel
        active={sortKey === key}
        direction={reverseSort ? 'desc' : 'asc'}
        onClick={() => setSortKey(key)}
      >
        {value}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <TableHead>
      <TableRow>
        {renderItem('date', 'date')}
        {renderItem('course', 'course')}
        {renderItem('score', 'total_strokes')}
        {renderItem('front', 'front_9_strokes')}
        {renderItem('back', 'back_9_strokes')}
        {renderItem('putts', 'total_putts')}
        {renderItem('girs', 'total_gir')}
        {renderItem('hdcp', 'handicap_index')}
      </TableRow>
    </TableHead>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  sortKey: state.rounds.sortKey,
  reverseSort: state.rounds.reverseSort
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  setSortKey: (key: string) => dispatch(setSortKey(key))
});

export const RoundsHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsHeaderComponent);
