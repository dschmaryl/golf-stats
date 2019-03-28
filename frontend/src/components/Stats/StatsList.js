import React from 'react';
import styled from 'styled-components';

const SeasonTd = styled.td`
  cursor: pointer;
  text-align: right;
`;

const stats = {
  strokes: 'scoring average',
  putts: 'putts per round',
  gir: 'greens per round',
  handicap: 'handicap',
  par3: 'par 3 average',
  par4: 'par 4 average',
  par5: 'par 5 average'
};

export const StatsList = ({ seasons, statsData, onClick }) => (
  <tbody>
    {Object.keys(stats).map(stat => (
      <tr key={stat}>
        <td>{stats[stat]}:</td>
        {seasons.map(season => (
          <SeasonTd onClick={() => onClick(season)} key={season + '-' + stat}>
            {statsData[season][stat]}
          </SeasonTd>
        ))}
      </tr>
    ))}
  </tbody>
);
