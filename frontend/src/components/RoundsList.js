import React from 'react';
import Moment from 'react-moment';
import { SelectedRound } from './SelectedRound';

// styles
const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const cursorPointer = {cursor: 'pointer'};

export function RoundsList(props) {
  return Object.keys(props.roundsData).reverse().map(key => {
    const round = props.roundsData[key];

    if (round.id === props.selectedRound) {
      return (
        <SelectedRound
          roundData={props.roundData}
          onClick={() => props.clickedSelected()}
          key={key}
        />
      );
    }

    function renderRow(value, className, style) {
      return (
        <div className={className} style={style}>
          {value}
        </div>
      );
    }

    return (
      <div
        className="row"
        onClick={() => props.onClick(round.id)}
        style={cursorPointer}
        key={key}
      >
        {renderRow(
          <Moment format="YYYY-MM-DD">{round['date']}</Moment>,
          'col-xs-2',
          alignLeft
        )}
        {renderRow(round['course'], 'col-xs-2', alignLeft)}
        {renderRow(round['total_strokes'], 'col-xs-1', alignRight)}
        {renderRow(round['front_9_strokes'], 'col-xs-1', alignRight)}
        {renderRow(round['back_9_strokes'], 'col-xs-1', alignRight)}
        {renderRow(round['total_putts'], 'col-xs-1', alignRight)}
        {renderRow(round['total_gir'], 'col-xs-1', alignRight)}
        {renderRow(round['handicap_index'], 'col-xs-1', alignRight)}
      </div>
    );
  });
}
