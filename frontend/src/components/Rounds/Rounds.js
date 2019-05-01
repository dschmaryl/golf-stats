import React from 'react';
import { connect } from 'react-redux';

import { setSortKey } from '../../actions/rounds';

import { PaddedDiv } from '../../components/PaddedDiv';

import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

export const RoundsComponent = ({ roundsLoaded, setSortKey }) => {
  if (!roundsLoaded) {
    return <p>loading rounds</p>;
  } else {
    return (
      <PaddedDiv className="row">
        <div className="col-xs-12">
          <RoundsHeader onClick={value => setSortKey(value)} />
          <RoundsList />
        </div>
      </PaddedDiv>
    );
  }
};

const mapStateToProps = state => ({
  roundsLoaded: state.rounds.roundsLoaded
});

const mapDispatchToProps = dispatch => ({
  setSortKey: key => dispatch(setSortKey(key))
});

export const Rounds = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsComponent);
