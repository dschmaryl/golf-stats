import React from 'react';
import Moment from 'react-moment';

const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const cursorPointer = {cursor: 'pointer'};

export function SelectedRound(props) {
  const round = props.roundData;

  round['front_9_par'] = Array(9).fill().map((v, i) => {
    return round['holes'][i+1]['par'];
  }).reduce((total, par) => total + par, 0);
  round['back_9_par'] = Array(9).fill().map((v, i) => {
    return round['holes'][i+10]['par'];
  }).reduce((total, par) => total + par, 0);
  round['total_par'] = round['front_9_par'] + round['back_9_par'];

  function renderRow(label, stat) {
    return (
      <tr>
        <td style={alignLeft}>{label}:</td>
        {Array(9).fill().map((v, i) => {
          return <td style={alignRight}>{round['holes'][i + 1][stat]}</td>;
        })}
        <td style={alignRight}>{round['front_9_' + stat]}</td>
        {Array(9).fill().map((v, i) => {
          return <td style={alignRight}>{round['holes'][i + 10][stat]}</td>;
        })}
        <td style={alignRight}>{round['back_9_' + stat]}</td>
        <td style={alignRight}>{round['total_' + stat]}</td>
      </tr>
    );
  }

  return (
    <div onClick={props.onClick} style={cursorPointer}>
      <div className="row" style={{'font-weight':'bold'}}>
        <div className="col-xs-2" style={alignLeft}>
          <Moment format="YYYY-MM-DD">{round['date']}</Moment>
        </div>
        <div className="col-xs-2" style={alignLeft}>
          {round['course']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['total_strokes']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['front_9_strokes']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['back_9_strokes']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['total_putts']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['total_gir']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['handicap_index']}
        </div>
      </div>

      <div className="row">
        <div className="col-xs-10">
          <table className="table" style={{width: '100%'}}>
            <thead>
              <tr>
                <th style={alignLeft}>hole:</th>
                {Array(9).fill().map((v, i) => {
                  return <th style={alignRight}>{i + 1}</th>;
                })}
                <th style={alignRight}>front</th>
                {Array(9).fill().map((v, i) => {
                  return <th style={alignRight}>{i + 10}</th>;
                })}
                <th style={alignRight}>back</th>
                <th style={alignRight}>total</th>
              </tr>
            </thead>
            <tbody>
              {renderRow('par', 'par')}
              {renderRow('score', 'strokes')}
              {renderRow('putts', 'putts')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
