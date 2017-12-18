import React from 'react';
import Moment from 'react-moment';

// styles
const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const cursorPointer = {cursor: 'pointer'};

function RoundsHeader(props) {
  function renderCell(value, key, reverse, style) {
    return (
      <th onClick={() => props.onClick(key, reverse)} style={style} key={key}>
        {value}
      </th>
    );
  }
  return (
    <thead>
      <tr style={cursorPointer}>
        {renderCell('date', 'date', false, alignLeft)}
        {renderCell('course', 'course', false, alignLeft)}
        {renderCell('score', 'total_strokes', true, alignRight)}
        {renderCell('putts', 'total_putts', true, alignRight)}
        {renderCell('girs', 'total_gir', false, alignRight)}
        {renderCell('hdcp', 'handicap_index', true, alignRight)}
      </tr>
    </thead>
  )
}

function RoundsList(props) {
  const selectedRound = props.selectedRound;

  return (
    <tbody>
      {Object.keys(props.roundsData).reverse().map(key => {
        const round = props.roundsData[key];

        return (
          <tr
            onClick={() => props.onClick(round.id)}
            style={cursorPointer}
            key={key}
          >
            <td style={alignLeft}>
              <Moment format="YYYY-MM-DD">{round['date']}</Moment>
            </td>
            <td style={alignLeft}>{round['course']}</td>
            <td style={alignRight}>{round['total_strokes']}</td>
            <td style={alignRight}>{round['total_putts']}</td>
            <td style={alignRight}>{round['total_gir']}</td>
            <td style={alignRight}>{round['handicap_index']}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

export class Rounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {roundsData: props.roundsData};
  }

  sortRows(sortBy, reversed) {
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
      <table style={{width: '80%'}}>
        <RoundsHeader
          onClick={(value, reverse) => this.sortRows(value, reverse)}
        />
        <RoundsList
          roundsData={this.state.roundsData}
          selectedRound={this.state.selectedRound}
          onClick={roundId => this.props.onClick(roundId)}
        />
      </table>
    );
  }
}
