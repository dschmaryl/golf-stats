import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import axios from 'axios';

import { SelectedRound } from '../SelectedRound/SelectedRound';

const ItemRight = styled.div`
  text-align: right;
`;

export class RoundsList extends React.Component {
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
    Object.keys(this.props.roundsData)
      .reverse()
      .map(key => {
        const round = this.props.roundsData[key];

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
              <Moment format="YYYY-MM-DD">{round['date']}</Moment>
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
