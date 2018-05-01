import React from 'react';
import styled from 'styled-components';

const SeasonTd = styled.td`
  cursor: pointer;
  text-align: right;
`;

export function StatsList(props) {
  const stats = {
    strokes: 'scoring average',
    putts: 'putts per round',
    gir: 'greens per round',
    handicap: 'handicap',
    par3: 'par 3 average',
    par4: 'par 4 average',
    par5: 'par 5 average'
  };

  return (
    <tbody>
      {Object.keys(stats).map(stat => {
        return (
          <tr key={stat}>
            <td>{stats[stat]}:</td>
            {props.seasons.map(season => {
              return (
                <SeasonTd
                  onClick={() => props.onClick(season)}
                  key={season + '-' + stat}
                >
                  {props.statsData[season][stat]}
                </SeasonTd>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
