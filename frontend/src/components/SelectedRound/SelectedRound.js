import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { SelectedRoundData } from './SelectedRoundData';

const SelectedDiv = styled.div`
  background-color: #f1f5f1;
`;

const TextRightSpan = styled.div`
  text-align: right;
`;

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
        <SelectedDiv className='col-xs-2' key={key}>
          <Moment format="YYYY-MM-DD">{props.roundData['date']}</Moment>
        </SelectedDiv>
      );
    } else if (key === 'course') {
      return (
        <SelectedDiv className='col-xs-2' key={key}>
          {props.roundData['course']}
        </SelectedDiv>
      );
    } else {
      return (
        <SelectedDiv className='col-xs-1' key={key}>
          <TextRightSpan>
            {props.roundData[key]}
          </TextRightSpan>
        </SelectedDiv>
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

      <SelectedRoundData roundData={round} />
    </div>
  );
}
