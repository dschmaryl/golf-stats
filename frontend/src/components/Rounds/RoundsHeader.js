import React from 'react';
import styled from 'styled-components';

const HeaderItem = styled.div`
  font-weight: bold;
`;

const HeaderItemRight = styled.div`
  font-weight: bold;
  text-align: right;
`;

export function RoundsHeader(props) {
  const renderItem = (value, key, reverse) =>
    value === 'date' || value === 'course' ? (
      <HeaderItem
        className="col-xs-3"
        onClick={() => props.onClick(key, reverse)}
      >
        {value}
      </HeaderItem>
    ) : (
      <HeaderItemRight
        className="col-xs-1"
        onClick={() => props.onClick(key, reverse)}
      >
        {value}
      </HeaderItemRight>
    );

  return (
    <div className="row" style={{ cursor: 'pointer' }}>
      {renderItem('date', 'date', false)}
      {renderItem('course', 'course', false)}
      {renderItem('score', 'total_strokes', true)}
      {renderItem('front', 'front_9_strokes', true)}
      {renderItem('back', 'back_9_strokes', true)}
      {renderItem('putts', 'total_putts', true)}
      {renderItem('girs', 'total_gir', false)}
      {renderItem('hdcp', 'handicap_index', true)}
    </div>
  );
}
