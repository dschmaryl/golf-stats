import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface PropTypes {
  seasons: Array<number>;
  onClick: Function;
}

export const StatsHeader: React.FC<PropTypes> = ({ seasons, onClick }) => (
  <TableHead>
    <TableRow>
      <TableCell>season:</TableCell>
      {seasons.map(season => (
        <TableCell
          align="right"
          key={season}
          onClick={() => onClick(season)}
          style={{ cursor: 'pointer' }}
        >
          {season === 2046 ? 'overall' : season}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
