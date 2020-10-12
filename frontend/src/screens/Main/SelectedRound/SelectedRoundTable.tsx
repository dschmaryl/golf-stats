import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { hideRoundDialog } from '../../../store/rounds/actions';
import { AppStateType } from '../../../store/types';
import { Round } from '../../../store/rounds/types';

import { styles } from './styles';

const frontNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const backNine = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const Cell = ({ text }: { text: any }) => (
	<TableCell
		align="right"
		style={('' + text).length > 1 ? styles.smallPadding : styles.bigPadding}
	>
		{text}
	</TableCell>
);

const CellLeft = ({ text }: { text: any }) => (
	<TableCell style={styles.smallPadding}>{text}</TableCell>
);

interface PropTypes {
	selectedRoundIsLoaded: boolean;
	round: Round;
}

export const SelectedRoundTableComponent: React.FC<PropTypes> = ({
	selectedRoundIsLoaded,
	round
}) => {
	if (!selectedRoundIsLoaded) {
		return (
			<div style={{ padding: '20px' }}>
				<h5>loading round data...</h5>
			</div>
		);
	} else {
		const roundData = round.roundData;

		roundData['front_9_par'] = frontNine.reduce(
			(sum, num) => sum + roundData['holes'][num]['par'],
			0
		);

		roundData['back_9_par'] = backNine.reduce(
			(sum, num) => sum + roundData['holes'][num]['par'],
			0
		);

		roundData['total_par'] = roundData['front_9_par'] + roundData['back_9_par'];

		const getStat = (holeNum: number, stat: string) =>
			stat === 'gir'
				? roundData['holes'][holeNum]['gir']
					? '*'
					: ''
				: roundData['holes'][holeNum][stat];

		const renderHole = (num: any) => <Cell text={num} key={'hole_' + num} />;

		const renderTableRow = (label: string, stat: string) => (
			<TableRow>
				<CellLeft text={label + ':'} />
				{frontNine.map((holeNum) => renderHole(getStat(holeNum, stat)))}
				<Cell text={roundData['front_9_' + stat]} />
				{backNine.map((holeNum) => renderHole(getStat(holeNum, stat)))}
				<Cell text={roundData['back_9_' + stat]} />
				<Cell text={roundData['total_' + stat]} />
			</TableRow>
		);

		return (
			<Table padding="dense">
				<TableHead>
					<TableRow>
						<CellLeft text="hole:" />
						{frontNine.map(renderHole)}
						<Cell text="front" />
						{backNine.map(renderHole)}
						<Cell text="back" />
						<Cell text="total" />
					</TableRow>
				</TableHead>
				<TableBody>
					{renderTableRow('par', 'par')}
					{renderTableRow('score', 'strokes')}
					{renderTableRow('putts', 'putts')}
					{renderTableRow('gir', 'gir')}
				</TableBody>
			</Table>
		);
	}
};

const mapStateToProps = (state: AppStateType) => ({
	selectedRoundIsLoaded: state.rounds.selectedRoundIsLoaded,
	round: state.rounds.data[state.rounds.selectedRoundIndex]
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
	hideRoundDialog: () => dispatch(hideRoundDialog())
});

export const SelectedRoundTable = connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectedRoundTableComponent);
