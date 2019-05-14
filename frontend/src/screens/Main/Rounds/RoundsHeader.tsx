import React from 'react';
import styled from 'styled-components';

const ItemLeft = styled.div`
  font-weight: bold;
`;

const ItemRight = styled.div`
  font-weight: bold;
  text-align: right;
`;

const renderItem = (value: string, key: string, onClick: Function) =>
  value === 'date' || value === 'course' ? (
    <ItemLeft className="col-xs-3" onClick={() => onClick(key)}>
      {value}
    </ItemLeft>
  ) : (
    <ItemRight className="col-xs-1" onClick={() => onClick(key)}>
      {value}
    </ItemRight>
  );

export const RoundsHeader: React.FC<{ onClick: Function }> = ({ onClick }) => (
  <div className="row" style={{ cursor: 'pointer' }}>
    {renderItem('date', 'date', onClick)}
    {renderItem('course', 'course', onClick)}
    {renderItem('score', 'total_strokes', onClick)}
    {renderItem('front', 'front_9_strokes', onClick)}
    {renderItem('back', 'back_9_strokes', onClick)}
    {renderItem('putts', 'total_putts', onClick)}
    {renderItem('girs', 'total_gir', onClick)}
    {renderItem('hdcp', 'handicap_index', onClick)}
  </div>
);
