import React from 'react';
import Moment from 'react-moment';
import { SelectedRound } from './SelectedRound';

// styles
const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const cursorPointer = {cursor: 'pointer'};

const headerLeft = {textAlign: 'left', fontWeight: 'bold'};
const headerRight = {textAlign: 'right', fontWeight: 'bold'};


function RoundsHeader(props) {
  function renderItem(value, key, className, reverse, style) {
    return (
      <div
        className={className}
        onClick={() => props.onClick(key, reverse)}
        style={style}
        key={key}
      >
        {value}
      </div>
    );
  }

  return (
    <div className="row" style={cursorPointer}>
      {renderItem('date', 'date', 'col-xs-2', false, headerLeft)}
      {renderItem('course', 'course', 'col-xs-2', false, headerLeft)}
      {renderItem('score', 'total_strokes', 'col-xs-1', true, headerRight)}
      {renderItem('front', 'front_9_strokes', 'col-xs-1', true, headerRight)}
      {renderItem('back', 'back_9_strokes', 'col-xs-1', true, headerRight)}
      {renderItem('putts', 'total_putts', 'col-xs-1', true, headerRight)}
      {renderItem('girs', 'total_gir', 'col-xs-1', false, headerRight)}
      {renderItem('hdcp', 'handicap_index', 'col-xs-1', true, headerRight)}
    </div>
  )
}

function RoundsList(props) {
  return Object.keys(props.roundsData).reverse().map(key => {
    const round = props.roundsData[key];

    if (round.id === props.selectedRound) {
      return (
        <SelectedRound
          roundData={props.roundData}
          onClick={() => props.clickedSelected()}
          key={key}
        />
      );
    }

    return (
      <div
        className="row"
        onClick={() => props.onClick(round.id)}
        style={cursorPointer}
        key={key}
      >
        <div className="col-xs-2" style={alignLeft}>
          <Moment format="YYYY-MM-DD">{round['date']}</Moment>
        </div>
        <div className="col-xs-2" style={alignLeft}>
          {round['course']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['total_strokes']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['front_9_strokes']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['back_9_strokes']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['total_putts']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['total_gir']}
        </div>
        <div className="col-xs-1" style={alignRight}>
          {round['handicap_index']}
        </div>
      </div>
    );
  });
}

export class Rounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {roundsData: props.roundsData};
  }

  sortRows(sortBy, reversed) {
    this.props.clickedSelected();
    if (sortBy === 'date') {
      this.setState({roundsData: this.props.roundsData})
    } else {
      this.setState({
        roundsData: Object.values(this.props.roundsData).sort((a, b) => {
          if (sortBy === 'course') {
            return a['course'] < b['course'];
          }
          if (reversed) {
            return b[sortBy] - a[sortBy];
          } else {
            return a[sortBy] - b[sortBy];
          }
        })
      })
    }
  }

  render() {
    return (
      <div>
        <RoundsHeader
          onClick={(value, reverse) => this.sortRows(value, reverse)}
        />
        <RoundsList
          roundsData={this.state.roundsData}
          selectedRound={this.props.selectedRound}
          roundData={this.props.roundData}
          onClick={roundId => this.props.onClick(roundId)}
          clickedSelected={() => this.props.clickedSelected()}
        />
      </div>
    );
  }
}
