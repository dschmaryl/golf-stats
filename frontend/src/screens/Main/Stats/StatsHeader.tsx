import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { styles } from './styles';

interface PropTypes {
  seasons: Array<number>;
  selectedSeason: number;
  onClick: Function;
}

export const StatsHeader: React.FC<PropTypes> = ({
  seasons,
  selectedSeason,
  onClick
}) => (
  <TableHead>
    <TableRow>
      <TableCell>season:</TableCell>
      {seasons.map(season => (
        <TableCell
          align="right"
          key={season}
          onClick={() => onClick(season)}
          style={
            // selectedSeason === season ? styles.selectedCell : styles.regularCell
            styles.regularCell
          }
        >
          {season === 2046 ? 'overall' : season}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
