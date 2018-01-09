import React from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { SelectedRound } from './SelectedRound';

const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const cursorPointer = {cursor: 'pointer'};

export class RoundsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRound: null, rounds: {}};
  }

  onRoundClick(roundId) {
    if (Object.keys(this.state.rounds).indexOf(''+ roundId) !== -1) {
      this.setState({
        roundData: this.state.rounds[roundId],
        selectedRound: roundId
      });
    } else {
      axios.get('/api/round/' + roundId)
        .then(roundData => {
          let rounds = this.state.rounds;
          rounds[roundId] = roundData.data;
          this.setState({
            roundData: roundData.data,
            rounds: rounds,
            selectedRound: roundId
          });
        })
    }
  }

  clickedSelected() {
    this.setState({selectedRound: null});
  }

  render() {
    return Object.keys(this.props.roundsData).reverse().map(key => {
      const round = this.props.roundsData[key];
      if (round.id === this.state.selectedRound) {
        return (
          <SelectedRound
            roundData={this.state.roundData}
            onClick={() => this.clickedSelected()}
            key={key}
          />
        );
      }

      function renderRowCell(value, className, style) {
        return (
          <div className={className} style={style}>
            {value}
          </div>
        );
      }

      return (
        <div
          className="row"
          onClick={() => this.onRoundClick(round.id)}
          style={cursorPointer}
          key={key}
        >
          {renderRowCell(
            <Moment format="YYYY-MM-DD">{round['date']}</Moment>,
            'col-xs-2',
            alignLeft
          )}
          {renderRowCell(round['course'], 'col-xs-2', alignLeft)}
          {renderRowCell(round['total_strokes'], 'col-xs-1', alignRight)}
          {renderRowCell(round['front_9_strokes'], 'col-xs-1', alignRight)}
          {renderRowCell(round['back_9_strokes'], 'col-xs-1', alignRight)}
          {renderRowCell(round['total_putts'], 'col-xs-1', alignRight)}
          {renderRowCell(round['total_gir'], 'col-xs-1', alignRight)}
          {renderRowCell(round['handicap_index'], 'col-xs-1', alignRight)}
        </div>
      );
    });
  }
}
