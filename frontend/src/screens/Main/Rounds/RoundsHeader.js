import React from 'react';
import styled from 'styled-components';

const ItemLeft = styled.div`
  font-weight: bold;
`;

const ItemRight = styled.div`
  font-weight: bold;
  text-align: right;
`;

const renderItem = (value, key, reverse, onClick) =>
  value === 'date' || value === 'course' ? (
    <ItemLeft className="col-xs-3" onClick={() => onClick(key, reverse)}>
      {value}
    </ItemLeft>
  ) : (
    <ItemRight className="col-xs-1" onClick={() => onClick(key, reverse)}>
      {value}
    </ItemRight>
  );

export const RoundsHeader = ({ onClick }) => (
  <div className="row" style={{ cursor: 'pointer' }}>
    {renderItem('date', 'date', false, onClick)}
    {renderItem('course', 'course', false, onClick)}
    {renderItem('score', 'total_strokes', true, onClick)}
    {renderItem('front', 'front_9_strokes', true, onClick)}
    {renderItem('back', 'back_9_strokes', true, onClick)}
    {renderItem('putts', 'total_putts', true, onClick)}
    {renderItem('girs', 'total_gir', false, onClick)}
    {renderItem('hdcp', 'handicap_index', true, onClick)}
  </div>
);
