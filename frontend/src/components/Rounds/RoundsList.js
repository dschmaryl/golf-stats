import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import axios from 'axios';

import { SelectedRound } from '../SelectedRound/SelectedRound';

const ItemRight = styled.div`
  text-align: right;
`;

class RoundsListComponent extends React.Component {
  state = { selectedRound: null, rounds: {} };

  componentWillReceiveProps = () => this.setState({ selectedRound: null });

  onRoundClick = roundId => {
    if (Object.keys(this.state.rounds).indexOf('' + roundId) !== -1) {
      this.setState({
        roundData: this.state.rounds[roundId],
        selectedRound: roundId
      });
    } else {
      axios.get('/api/round/' + roundId).then(roundData => {
        let rounds = this.state.rounds;
        rounds[roundId] = roundData.data;
        this.setState({
          roundData: roundData.data,
          rounds: rounds,
          selectedRound: roundId
        });
      });
    }
  };

  render = () =>
    Object.keys(this.props.rounds)
      .filter(
        key =>
          !this.props.selectedSeason ||
          this.props.rounds[key].date.split('-')[0] ===
            this.props.selectedSeason
      )
      .sort(
        (a, b) =>
          this.props.rounds[this.props.reverseSort ? b : a][
            this.props.sortKey
          ] -
          this.props.rounds[this.props.reverseSort ? a : b][this.props.sortKey]
      )
      .map(key => {
        const round = this.props.rounds[key];

        return round.id === this.state.selectedRound ? (
          <SelectedRound
            round={round}
            roundData={this.state.roundData}
            onClick={() => this.setState({ selectedRound: null })}
            key={key}
          />
        ) : (
          <div
            className="row"
            onClick={() => this.onRoundClick(round.id)}
            style={{ cursor: 'pointer' }}
            key={key}
          >
            <div className="col-xs-3">
              {round['date'].split(' ')[0]}
            </div>
            <div className="col-xs-3">{round['course']}</div>
            <ItemRight className="col-xs-1">{round['total_strokes']}</ItemRight>
            <ItemRight className="col-xs-1">
              {round['front_9_strokes']}
            </ItemRight>
            <ItemRight className="col-xs-1">
              {round['back_9_strokes']}
            </ItemRight>
            <ItemRight className="col-xs-1">{round['total_putts']}</ItemRight>
            <ItemRight className="col-xs-1">{round['total_gir']}</ItemRight>
            <ItemRight className="col-xs-1">
              {round['handicap_index']}
            </ItemRight>
          </div>
        );
      });
}

const mapStateToProps = state => ({
  rounds: state.rounds.data,
  sortKey: state.rounds.sortKey,
  reverseSort: state.rounds.reverseSort,
  selectedSeason: state.stats.selectedSeason
});

export const RoundsList = connect(mapStateToProps)(RoundsListComponent);
