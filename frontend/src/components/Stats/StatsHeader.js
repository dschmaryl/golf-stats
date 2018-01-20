import React from 'react';

export function StatsHeader(props) {
  return (
    <thead>
      <tr>
        <th>season:</th>
        {props.seasons.map(season => {
          return (
            <th
              onClick={() => props.onClick(season)}
              className='stats-season'
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
