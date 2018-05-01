import React from 'react';

const alignLeft = { textAlign: 'left' };
const alignRight = { textAlign: 'right' };
const tableRight = { textAlign: 'Right', maxWidth: '28px' };

export function SelectedRoundData(props) {
  const round = props.roundData;

  function nineHoleTotal(startHole, stat) {
    return Array(9)
      .fill()
      .map((v, i) => {
        return round['holes'][i + startHole][stat];
      })
      .reduce((total, hole) => total + hole, 0);
  }

  round['front_9_par'] = nineHoleTotal(1, 'par');
  round['back_9_par'] = nineHoleTotal(10, 'par');
  round['total_par'] = round['front_9_par'] + round['back_9_par'];

  function renderTableRow(label, stat) {
    function renderHoles(startHole, stat) {
      function holeStat(holeNumber) {
        if (stat === 'gir') {
          return round['holes'][holeNumber]['gir'] ? '*' : '';
        } else {
          return round['holes'][holeNumber][stat];
        }
      }
      return Array(9)
        .fill()
        .map((v, i) => {
          return (
            <td style={tableRight} key={stat + '_' + (i + startHole)}>
              {holeStat(i + startHole)}
            </td>
          );
        });
    }
    return (
      <tr>
        <td style={alignLeft}>{label}:</td>
        {renderHoles(1, stat)}
        <td style={alignRight}>{round['front_9_' + stat]}</td>
        {renderHoles(10, stat)}
        <td style={alignRight}>{round['back_9_' + stat]}</td>
        <td style={alignRight}>{round['total_' + stat]}</td>
      </tr>
    );
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={alignLeft}>hole:</th>
              {Array(9)
                .fill()
                .map((v, i) => {
                  return (
                    <th style={tableRight} key={'hole_' + (i + 1)}>
                      {i + 1}
                    </th>
                  );
                })}
              <th style={alignRight}>front</th>
              {Array(9)
                .fill()
                .map((v, i) => {
                  return (
                    <th style={tableRight} key={'hole_' + (i + 10)}>
                      {i + 10}
                    </th>
                  );
                })}
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
}
