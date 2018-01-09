import React from 'react';
import Moment from 'react-moment';
import { SelectedRoundStats } from './SelectedRoundStats';

const headerLeft = {textAlign: 'left', background: "#f1f5f1"};
const headerRight = {textAlign: 'right', background: "#f1f5f1"};
const cursorPointer = {cursor: 'pointer'};

export function SelectedRound(props) {
  const round = props.roundData;

  function renderRowCell(stat, className, style) {
    return (
      <div className={className} style={style}>
        {stat}
      </div>
    );
  }

  return (
    <div onClick={props.onClick} style={cursorPointer}>
      <div className="row">
        {renderRowCell(
          <Moment format="YYYY-MM-DD">{round['date']}</Moment>,
          'col-xs-2',
          headerLeft
        )}
        {renderRowCell(round['course'], 'col-xs-2', headerLeft)}
        {renderRowCell(round['total_strokes'], 'col-xs-1', headerRight)}
        {renderRowCell(round['front_9_strokes'], 'col-xs-1', headerRight)}
        {renderRowCell(round['back_9_strokes'], 'col-xs-1', headerRight)}
        {renderRowCell(round['total_putts'], 'col-xs-1', headerRight)}
        {renderRowCell(round['total_gir'], 'col-xs-1', headerRight)}
        {renderRowCell(round['handicap_index'], 'col-xs-1', headerRight)}
      </div>

      <SelectedRoundStats roundData={round} />
    </div>
  );
}
