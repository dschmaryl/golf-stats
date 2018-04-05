import React from 'react';

import './RoundsHeader.css';

export function RoundsHeader(props) {
  function renderItem(value, key, reverse) {
    let className = 'col-xs-1 round-header-stat';
    if (value === 'date' || value === 'course') {
      className = `col-xs-3 round-header-${value}`;
    }

    return (
      <div
        className={className}
        onClick={() => props.onClick(key, reverse)}
      >
        {value}
      </div>
    );
  }

  return (
    <div className="row" style={{cursor: 'pointer'}}>
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
