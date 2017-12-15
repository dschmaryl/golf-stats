import React from 'react';
import Moment from 'react-moment';

// styles
const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const cursorPointer = {cursor: 'pointer'};

function RoundListHeader(props) {
  function renderCell(value, key, reverse, style) {
    return (
      <th onClick={() => props.onClick(value, key)} style={style} >
        {printName}
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

function RoundListRow(props) {
  return (
    <tr onClick={props.onClick} style={cursorPointer}>
      <td style={alignLeft}>
        <Moment format="YYYY-MM-DD">{props.round['date']}</Moment>
      </td>
      <td style={alignLeft}>{props.round['course']}</td>
      <td style={alignRight}>{props.round['total_strokes']}</td>
      <td style={alignRight}>{props.round['total_putts']}</td>
      <td style={alignRight}>{props.round['total_gir']}</td>
      <td style={alignRight}>{props.round['handicap_index']}</td>
    </tr>
  );
}

export class RoundList extends React.Component {
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

  renderRows(roundsData) {
    return Object.keys(roundsData).reverse().map(key => {
      const round = roundsData[key];
      return (
        <RoundListRow
          round={round}
          onClick={() => this.props.onClick(round.id)}
          key={round.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <table style={{width: '80%'}}>
          <RoundListHeader
            onClick={(key, reverse) => this.sortRows(key, reverse)}
          />
          <tbody>
            {this.renderRows(this.state.roundsData)}
          </tbody>
        </table>
      </div>
    );
  }
}
