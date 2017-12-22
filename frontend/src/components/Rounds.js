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

    function renderRow(value, className, style) {
      return (
        <div className={className} style={style}>
          {value}
        </div>
      );
    }

    return (
      <div
        className="row"
        onClick={() => props.onClick(round.id)}
        style={cursorPointer}
        key={key}
      >
        {renderRow(
          <Moment format="YYYY-MM-DD">{round['date']}</Moment>,
          'col-xs-2',
          alignLeft
        )}
        {renderRow(round['course'], 'col-xs-2', alignLeft)}
        {renderRow(round['total_strokes'], 'col-xs-1', alignRight)}
        {renderRow(round['front_9_strokes'], 'col-xs-1', alignRight)}
        {renderRow(round['back_9_strokes'], 'col-xs-1', alignRight)}
        {renderRow(round['total_putts'], 'col-xs-1', alignRight)}
        {renderRow(round['total_gir'], 'col-xs-1', alignRight)}
        {renderRow(round['handicap_index'], 'col-xs-1', alignRight)}
      </div>
    );
  });
}

export class Rounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roundsData: props.roundsData,
      lastSortedBy: '',
      lastSortReversed: false
    };
  }

  sortRounds(sortBy, reversed) {
    this.props.clickedSelected();
    const roundsData = this.props.roundsData;
    let lastSortReversed = this.state.lastSortReversed;

    function sortRoundsData(sortBy, reversed) {
      if (sortBy === 'date') {
        if (reversed) {
          return Object.values(roundsData).reverse();
        } else {
          return Object.values(roundsData);
        }
      } else {
        return Object.values(roundsData).sort((a, b) => {
          if (sortBy === 'course') {
            if (reversed) {
              return b['course'] < a['course'];
            } else {
              return a['course'] < b['course'];
            }
          }
          if (reversed) {
            return b[sortBy] - a[sortBy];
          } else {
            return a[sortBy] - b[sortBy];
          }
        });
      }
    }

    if (sortBy === this.state.lastSortedBy) {
      this.setState({roundsData: sortRoundsData(sortBy, !lastSortReversed)});
    } else {
      this.setState({roundsData: sortRoundsData(sortBy, reversed)});
      lastSortReversed = !reversed;
    }

    this.setState({lastSortedBy: sortBy, lastSortReversed: !lastSortReversed});
  }

  render() {
    return (
      <div>
        <RoundsHeader
          onClick={(value, reverse) => this.sortRounds(value, reverse)}
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
