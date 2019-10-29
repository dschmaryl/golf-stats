import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { hideRoundDialog } from '../../../../store/rounds/actions';

import { AppStateType } from '../../../../store/types';
import { Round } from '../../../../store/rounds/types';

const bigPadding = { padding: '8px' };
const smallPadding = { padding: '5px' };

const nineHoleArray = (func: Function) =>
  Array.from({ length: 9 }, (v, i) => func(v, i));

const Cell = ({ text }: { text: any }) => (
  <TableCell
    align="right"
    style={('' + text).length > 1 ? smallPadding : bigPadding}
  >
    {text}
  </TableCell>
);

const CellLeft = ({ text }: { text: any }) => (
  <TableCell style={smallPadding}>{text}</TableCell>
);

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
        <Cell
          text={holeStat(i + startHole, stat)}
          key={stat + '_' + (i + startHole)}
        />
      ));

    const renderTableRow = (label: string, stat: string) => (
      <TableRow>
        <CellLeft text={label + ':'} />
        {renderHoles(1, stat)}
        <Cell text={roundData['front_9_' + stat]} />
        {renderHoles(10, stat)}
        <Cell text={roundData['back_9_' + stat]} />
        <Cell text={roundData['total_' + stat]} />
      </TableRow>
    );

    return (
      <Table padding="dense">
        <TableHead>
          <TableRow>
            <CellLeft text="hole:" />
            {nineHoleArray((_: any, i: number) => (
              <Cell text={i + 1} key={'hole_' + (i + 1)} />
            ))}
            <Cell text="front" />
            {nineHoleArray((_: any, i: number) => (
              <Cell text={i + 10} key={'hole_' + (i + 10)} />
            ))}
            <Cell text="back" />
            <Cell text="total" />
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
