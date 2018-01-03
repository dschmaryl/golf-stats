import React from 'react';

const cursorPointer = {cursor: 'pointer'};
const headerLeft = {textAlign: 'left', fontWeight: 'bold'};
const headerRight = {textAlign: 'right', fontWeight: 'bold'};

export function RoundsHeader(props) {
  function renderItem(value, key, className, reverse, style) {
    return (
      <div
        className={className}
        onClick={() => props.onClick(key, reverse)}
        style={style}
        key={key}
      >
        {value}
      </div>
    );
  }
  return (
    <div className="row" style={cursorPointer}>
      {renderItem('date', 'date', 'col-xs-2', false, headerLeft)}
      {renderItem('course', 'course', 'col-xs-2', false, headerLeft)}
      {renderItem('score', 'total_strokes', 'col-xs-1', true, headerRight)}
      {renderItem('front', 'front_9_strokes', 'col-xs-1', true, headerRight)}
      {renderItem('back', 'back_9_strokes', 'col-xs-1', true, headerRight)}
      {renderItem('putts', 'total_putts', 'col-xs-1', true, headerRight)}
      {renderItem('girs', 'total_gir', 'col-xs-1', false, headerRight)}
      {renderItem('hdcp', 'handicap_index', 'col-xs-1', true, headerRight)}
    </div>
  )
}
