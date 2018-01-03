import React from 'react';

const alignLeft = {textAlign: 'left'};
const pointerRight = {cursor: 'pointer', textAlign: 'right'};

export function StatsHeader(props) {
  return (
    <thead>
      <tr>
        <th style={alignLeft}>season:</th>
        {props.seasons.map(season => {
          return (
            <th
              onClick={() => props.onClick(season)}
              style={pointerRight}
              key={season}
            >
              {season === '2046' ? 'overall' : season}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
