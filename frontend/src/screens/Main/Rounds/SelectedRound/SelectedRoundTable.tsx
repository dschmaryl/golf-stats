import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { hideRoundDialog } from '../../../../actions/rounds';

import { AppStateType } from '../../../../types';
import { Round } from '../../../../types/rounds';

const nineHoleArray = (func: Function) =>
  Array.from({ length: 9 }, (v, i) => func(v, i));

interface PropTypes {
  selectedRoundIsLoaded: boolean;
  round: Round;
}

export const SelectedRoundTableComponent: React.FC<PropTypes> = ({
  selectedRoundIsLoaded,
  round
}) => {
  if (!selectedRoundIsLoaded) {
    return (
      <div style={{ padding: '20px' }}>
        <h5>loading round data...</h5>
      </div>
    );
  } else {
    console.log(round);

    const roundData = round.roundData;
    const nineHoleTotal = (startHole: number, stat: string) =>
      nineHoleArray(
        (_: any, i: number) => roundData['holes'][i + startHole][stat]
      ).reduce((total: number, hole: number) => total + hole);

    roundData['front_9_par'] = nineHoleTotal(1, 'par');
    roundData['back_9_par'] = nineHoleTotal(10, 'par');
    roundData['total_par'] = roundData['front_9_par'] + roundData['back_9_par'];

    const holeStat = (holeNumber: number, stat: string) =>
      stat === 'gir'
        ? roundData['holes'][holeNumber]['gir']
          ? '*'
          : ''
        : roundData['holes'][holeNumber][stat];

    const renderHoles = (startHole: number, stat: string) =>
      nineHoleArray((_: any, i: number) => (
        <TableCell
          align="right"
          style={{ padding: '6px' }}
          key={stat + '_' + (i + startHole)}
        >
          {holeStat(i + startHole, stat)}
        </TableCell>
      ));

    const renderTableRow = (label: string, stat: string) => (
      <TableRow>
        <TableCell style={{ padding: '8px' }}>{label}:</TableCell>
        {renderHoles(1, stat)}
        <TableCell align="right" style={{ padding: '8px' }}>{roundData['front_9_' + stat]}</TableCell>
        {renderHoles(10, stat)}
        <TableCell align="right" style={{ padding: '8px' }}>{roundData['back_9_' + stat]}</TableCell>
        <TableCell align="right" style={{ padding: '8px' }}>{roundData['total_' + stat]}</TableCell>
      </TableRow>
    );

    return (
      <Table padding="dense">
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: '8px' }}>hole:</TableCell>
            {nineHoleArray((_: any, i: number) => (
              <TableCell
                align="right"
                style={{ padding: '6px' }}
                key={'hole_' + (i + 1)}
              >
                {i + 1}
              </TableCell>
            ))}
            <TableCell align="right" style={{ padding: '8px' }}>front</TableCell>
            {nineHoleArray((_: any, i: number) => (
              <TableCell
                align="right"
                style={{ padding: '6px' }}
                key={'hole_' + (i + 10)}
              >
                {i + 10}
              </TableCell>
            ))}
            <TableCell align="right" style={{ padding: '8px' }}>back</TableCell>
            <TableCell align="right" style={{ padding: '8px' }}>total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableRow('par', 'par')}
          {renderTableRow('score', 'strokes')}
          {renderTableRow('putts', 'putts')}
          {renderTableRow('gir', 'gir')}
        </TableBody>
      </Table>
    );
  }
};

const mapStateToProps = (state: AppStateType) => ({
  selectedRoundIsLoaded: state.rounds.selectedRoundIsLoaded,
  round: state.rounds.data[state.rounds.selectedRoundIndex]
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  hideRoundDialog: () => dispatch(hideRoundDialog())
});

export const SelectedRoundTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedRoundTableComponent);
