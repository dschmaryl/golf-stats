import React from 'react';
import styled from 'styled-components';

import { RoundData } from '../../../../types/rounds';

const ThLeft = styled.th`
  text-align: left;
`;
const TdLeft = styled.td`
  text-align: left;
`;
const ThRight = styled.th`
  text-align: right;
`;
const TdRight = styled.td`
  text-align: right;
  max-width: 28px;
`;

const nineHoleArray = (func: Function) =>
  Array.from({ length: 9 }, (_, i) => func());

interface PropTypes {
  roundData: RoundData;
}

export const SelectedRoundData: React.FC<PropTypes> = ({ roundData }) => {
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
      <TdRight key={stat + '_' + (i + startHole)}>
        {holeStat(i + startHole, stat)}
      </TdRight>
    ));

  const renderTableRow = (label: string, stat: string) => (
    <tr>
      <TdLeft>{label}:</TdLeft>
      {renderHoles(1, stat)}
      <TdRight>{roundData['front_9_' + stat]}</TdRight>
      {renderHoles(10, stat)}
      <TdRight>{roundData['back_9_' + stat]}</TdRight>
      <TdRight>{roundData['total_' + stat]}</TdRight>
    </tr>
  );

  return (
    <div className="row">
      <div className="col-xs-12">
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <ThLeft>hole:</ThLeft>
              {nineHoleArray((_: any, i: number) => (
                <ThRight key={'hole_' + (i + 1)}>{i + 1}</ThRight>
              ))}
              <ThRight>front</ThRight>
              {nineHoleArray((_: any, i: number) => (
                <ThRight key={'hole_' + (i + 10)}>{i + 10}</ThRight>
              ))}
              <ThRight>back</ThRight>
              <ThRight>total</ThRight>
            </tr>
          </thead>
          <tbody>
            {renderTableRow('par', 'par')}
            {renderTableRow('score', 'strokes')}
            {renderTableRow('putts', 'putts')}
            {renderTableRow('gir', 'gir')}
          </tbody>
        </table>
      </div>
    </div>
  );
};
