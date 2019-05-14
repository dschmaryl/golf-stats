import React from 'react';
import styled from 'styled-components';

import { StatsType } from '../../../types/stats';

const SeasonTd = styled.td`
  cursor: pointer;
  text-align: right;
`;

type StatKeysType = { [stat: string]: string };

const statKeys: StatKeysType = {
  strokes: 'scoring average',
  putts: 'putts per round',
  gir: 'greens per round',
  handicap: 'handicap',
  par3: 'par 3 average',
  par4: 'par 4 average',
  par5: 'par 5 average'
};

interface PropTypes {
  seasons: Array<number>;
  stats: StatsType;
  onClick: Function;
}

export const StatsList: React.FC<PropTypes> = ({ seasons, stats, onClick }) => (
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
