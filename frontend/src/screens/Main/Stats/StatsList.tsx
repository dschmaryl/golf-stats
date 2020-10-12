import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { StatsType } from '../../../store/stats/types';

import { styles } from './styles';

// type StatKeysType = { [stat: string]: string };

// const statKeys: StatKeysType = {
//   strokes: 'scoring average',
//   putts: 'putts per round',
//   gir: 'greens per round',
//   handicap: 'handicap',
//   par3: 'par 3 average',
//   par4: 'par 4 average',
//   par5: 'par 5 average'
// };

const statKeys: Array<string> = [
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
	// <TableBody>
	//   {Object.keys(statKeys).map(stat => (
	//     <TableRow key={stat}>
	//       <TableCell>{statKeys[stat]}:</TableCell>
	//       {seasons.map(season => (
	//         <TableCell
	//           align="right"
	//           key={season + '-' + stat}
	//           onClick={() => onClick(season)}
	//           style={
	//             selectedSeason === season
	//               ? styles.selectedCell
	//               : styles.regularCell
	//           }
	//         >
	//           {stats[season][stat]}
	//         </TableCell>
	//       ))}
	//     </TableRow>
	//   ))}
	// </TableBody>
	<TableBody>
		{seasons.map((season: number) => (
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
				{statKeys.map((stat: string) => (
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
