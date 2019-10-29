import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';

import { AppStateType } from '../../../store/types';

import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

import { styles } from './styles';

interface PropTypes {
  roundsLoaded: boolean;
}

export const RoundsComponent: React.FC<PropTypes> = ({ roundsLoaded }) => (
  <div style={styles.roundsContainer}>
    <h2>rounds</h2>
    {!roundsLoaded ? (
      <div style={styles.loadingDiv}>
        <h5>loading rounds...</h5>
      </div>
    ) : (
      <Table padding="dense" style={styles.roundsTable}>
        <RoundsHeader />
        <RoundsList />
      </Table>
    )}
  </div>
);

const mapStateToProps = (state: AppStateType) => ({
  roundsLoaded: state.rounds.roundsLoaded
});

export const Rounds = connect(mapStateToProps)(RoundsComponent);
