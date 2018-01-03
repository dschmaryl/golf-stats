import React from 'react';

const cursorPointer = {cursor: 'pointer'};
const headerLeft = {textAlign: 'left', fontWeight: 'bold'};
const headerRight = {textAlign: 'right', fontWeight: 'bold'};

export function RoundsHeader(props) {
  function renderItem(value, key, reverse) {
    let className = 'col-xs-1';
    let style  = headerRight;
    if (value === 'date' || value === 'course') {
      className = 'col-xs-2';
      style = headerLeft;
    }
    return (
      <div
        className={className}
        onClick={() => props.onClick(key, reverse)}
        style={style}
      >
        {value}
      </div>
    );
  }

  return (
    <div className="row" style={cursorPointer}>
      {renderItem('date', 'date', false)}
      {renderItem('course', 'course', false)}
      {renderItem('score', 'total_strokes', true)}
      {renderItem('front', 'front_9_strokes', true)}
      {renderItem('back', 'back_9_strokes', true)}
      {renderItem('putts', 'total_putts', true)}
      {renderItem('girs', 'total_gir', false)}
      {renderItem('hdcp', 'handicap_index', true)}
    </div>
  )
}
