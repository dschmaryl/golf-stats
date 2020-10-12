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

const stats: Array<string> = [
	'score',
	'putts',
	'greens',
	'handicap',
	'par 3',
	'par 4',
	'par 5'
];

export const StatsHeader: React.FC<PropTypes> = ({
	seasons,
	selectedSeason,
	onClick
}) => (
	<TableHead>
		<TableRow>
			{/* <TableCell>season:</TableCell>
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
      ))} */}
			<TableCell style={styles.seasonHeaderCell}>season</TableCell>
			{stats.map((stat) => (
				<TableCell align="right" key={stat} style={styles.headerCell}>
					{stat}
				</TableCell>
			))}
		</TableRow>
	</TableHead>
);
