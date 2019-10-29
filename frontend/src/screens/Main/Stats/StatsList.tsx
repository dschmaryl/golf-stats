import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { StatsType } from '../../../store/stats/types';

import { styles } from './styles';

const statKeys = [
  'strokes',
  'putts',
  'gir',
  'handicap',
  'par3',
  'par4',
  'par5'
];

interface PropTypes {
  seasons: Array<number>;
  stats: StatsType;
  selectedSeason: number;
  onClick: Function;
}

export const StatsList: React.FC<PropTypes> = ({
  seasons,
  stats,
  selectedSeason,
  onClick
}) => (
  <TableBody>
    {seasons.map(season => (
      <TableRow key={season} onClick={() => onClick(season)} hover>
        <TableCell
          style={
            selectedSeason === season
              ? styles.selectedSeasonCell
              : styles.seasonCell
          }
        >
          {season === 2046 ? 'overall' : season}
        </TableCell>
        {statKeys.map(stat => (
          <TableCell
            align="right"
            key={season + '-' + stat}
            style={
              selectedSeason === season
                ? styles.selectedCell
                : styles.regularCell
            }
          >
            {stats[season][stat]}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
