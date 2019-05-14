import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { setSortKey } from '../../../actions/rounds';

import { AppStateType } from '../../../types';

import { PaddedDiv } from '../../../components/PaddedDiv';

import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

interface PropTypes {
  roundsLoaded: boolean;
  setSortKey: Function;
}

export const RoundsComponent: React.FC<PropTypes> = ({
  roundsLoaded,
  setSortKey
}) => (
  <PaddedDiv className="row">
    {!roundsLoaded ? (
      <p>loading rounds...</p>
    ) : (
      <div className="col-xs-12">
        <RoundsHeader onClick={setSortKey} />
        <RoundsList />
      </div>
    )}
  </PaddedDiv>
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
