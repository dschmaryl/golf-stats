import React from 'react';

const alignLeft = {textAlign: 'left'};
const pointerRight = {cursor: 'pointer', textAlign: 'right'};

export function StatsList(props) {
  const stats = {
    'strokes': 'scoring average',
    'putts': 'putts per round',
    'gir': 'greens per round',
    'handicap': 'handicap',
    'par3': 'par 3 average',
    'par4': 'par 4 average',
    'par5': 'par 5 average'
  };

  return (
    <tbody>
      {Object.keys(stats).map(stat => {
        return (
          <tr key={stat}>
            <td style={alignLeft}>{stats[stat]}:</td>
            {props.seasons.map(season => {
              return (
                <td
                  onClick={() => props.onClick(season)}
                  style={pointerRight}
                  key={season + '-' + stat}
                >
                  {props.statsData[season][stat]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
