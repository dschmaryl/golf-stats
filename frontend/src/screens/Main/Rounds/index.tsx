import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Table from '@material-ui/core/Table';

import { setSortKey } from '../../../actions/rounds';

import { AppStateType } from '../../../types';

import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

import { SelectedRound } from './SelectedRound';

interface PropTypes {
  roundsLoaded: boolean;
  setSortKey: Function;
}

export const RoundsComponent: React.FC<PropTypes> = ({
  roundsLoaded,
  setSortKey
}) => (
  <div style={{ marginTop: '40px', marginBottom: '50px' }}>
    <h2>rounds</h2>
    {!roundsLoaded ? (
      <div style={{ padding: '10px' }}>
        <h5>loading rounds...</h5>
      </div>
    ) : (
      <Table padding="dense" style={{ marginTop: '-10px' }}>
        <RoundsHeader onClick={setSortKey} />
        <RoundsList />
      </Table>
    )}
    <SelectedRound />
  </div>
);

const mapStateToProps = (state: AppStateType) => ({
  roundsLoaded: state.rounds.roundsLoaded
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  setSortKey: (key: string) => dispatch(setSortKey(key))
});

export const Rounds = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsComponent);
