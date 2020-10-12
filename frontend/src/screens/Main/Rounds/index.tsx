import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';

import { AppStateType } from '../../../store/types';

import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

import { SelectedRound } from './SelectedRound';

interface PropTypes {
	roundsLoaded: boolean;
}

export const RoundsComponent: React.FC<PropTypes> = ({ roundsLoaded }) => (
	<div style={{ marginTop: '40px', marginBottom: '50px' }}>
		<h2>rounds</h2>
		{!roundsLoaded ? (
			<div style={{ padding: '10px' }}>
				<h5>loading rounds...</h5>
			</div>
		) : (
			<Table padding="dense" style={{ marginTop: '-10px' }}>
				<RoundsHeader />
				<RoundsList />
			</Table>
		)}
		<SelectedRound />
	</div>
);

const mapStateToProps = (state: AppStateType) => ({
	roundsLoaded: state.rounds.roundsLoaded
});

export const Rounds = connect(mapStateToProps)(RoundsComponent);
