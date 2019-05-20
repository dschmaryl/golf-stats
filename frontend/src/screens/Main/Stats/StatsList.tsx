import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { StatsType } from '../../../types/stats';

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
  <TableBody>
    {Object.keys(statKeys).map(stat => (
      <TableRow key={stat}>
        <TableCell>{statKeys[stat]}:</TableCell>
        {seasons.map(season => (
          <TableCell
            align="right"
            key={season + '-' + stat}
            onClick={() => onClick(season)}
            style={{ cursor: 'pointer' }}
          >
            {stats[season][stat]}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
