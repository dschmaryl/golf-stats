import React from 'react';

const alignLeft = { textAlign: 'left' };
const alignRight = { textAlign: 'right' };
const tableRight = { textAlign: 'Right', maxWidth: '28px' };

const nineHoleArray = func => Array.from({ length: 9 }, func);

export const SelectedRoundData = ({ roundData }) => {
  const nineHoleTotal = (startHole, stat) =>
    nineHoleArray((_, i) => roundData['holes'][i + startHole][stat]).reduce(
      (total, hole) => total + hole
    );

  roundData['front_9_par'] = nineHoleTotal(1, 'par');
  roundData['back_9_par'] = nineHoleTotal(10, 'par');
  roundData['total_par'] = roundData['front_9_par'] + roundData['back_9_par'];

  const holeStat = (holeNumber, stat) =>
    stat === 'gir'
      ? roundData['holes'][holeNumber]['gir']
        ? '*'
        : ''
      : roundData['holes'][holeNumber][stat];

  const renderHoles = (startHole, stat) =>
    nineHoleArray((_, i) => (
      <td style={tableRight} key={stat + '_' + (i + startHole)}>
        {holeStat(i + startHole, stat)}
      </td>
    ));

  const renderTableRow = (label, stat) => (
    <tr>
      <td style={alignLeft}>{label}:</td>
      {renderHoles(1, stat)}
      <td style={alignRight}>{roundData['front_9_' + stat]}</td>
      {renderHoles(10, stat)}
      <td style={alignRight}>{roundData['back_9_' + stat]}</td>
      <td style={alignRight}>{roundData['total_' + stat]}</td>
    </tr>
  );

  return (
    <div className="row">
      <div className="col-xs-12">
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={alignLeft}>hole:</th>
              {nineHoleArray((_, i) => (
                <th style={tableRight} key={'hole_' + (i + 1)}>
                  {i + 1}
                </th>
              ))}
              <th style={alignRight}>front</th>
              {nineHoleArray((_, i) => (
                <th style={tableRight} key={'hole_' + (i + 10)}>
                  {i + 10}
                </th>
              ))}
              <th style={alignRight}>back</th>
              <th style={alignRight}>total</th>
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
