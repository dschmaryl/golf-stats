import React from 'react';
import styled from 'styled-components';

const SeasonTd = styled.td`
  cursor: pointer;
  text-align: right;
`;

const statKeys = {
  strokes: 'scoring average',
  putts: 'putts per round',
  gir: 'greens per round',
  handicap: 'handicap',
  par3: 'par 3 average',
  par4: 'par 4 average',
  par5: 'par 5 average'
};

export const StatsList = ({ seasons, stats, onClick }) => (
  <tbody>
    {Object.keys(statKeys).map(stat => (
      <tr key={stat}>
        <td>{statKeys[stat]}:</td>
        {seasons.map(season => (
          <SeasonTd onClick={() => onClick(season)} key={season + '-' + stat}>
            {stats[season][stat]}
          </SeasonTd>
        ))}
      </tr>
    ))}
  </tbody>
);
