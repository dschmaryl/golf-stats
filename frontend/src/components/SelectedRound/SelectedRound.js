import React from 'react';
import Moment from 'react-moment';
import { SelectedRoundStats } from './SelectedRoundStats';

import './SelectedRound.css';

export function SelectedRound(props) {
  const round = props.roundData;
  const roundDataKeys = [
    'date',
    'course',
    'total_strokes',
    'front_9_strokes',
    'back_9_strokes',
    'total_putts',
    'total_gir',
    'handicap_index'
  ];

  function renderRowItem(key) {
    if (key === 'date') {
      return (
        <div className='col-xs-2 selected-round-date' key={key}>
          <Moment format="YYYY-MM-DD">{props.roundData['date']}</Moment>
        </div>
      );
    } else if (key === 'course') {
      return (
        <div className='col-xs-2 selected-round-course' key={key}>
          {props.roundData['course']}
        </div>
      );
    } else {
      return (
        <div className='col-xs-1 selected-round-stat' key={key}>
          {props.roundData[key]}
        </div>
      );
    }
  }

  function renderRowItems() {
    return roundDataKeys.map(key => renderRowItem(key));
  }

  return (
    <div onClick={props.onClick} style={{cursor: 'pointer'}}>
      <div className="row selected-round-row">
        {renderRowItems()}
      </div>

      <SelectedRoundStats roundData={round} />
    </div>
  );
}
