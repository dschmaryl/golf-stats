import React from 'react';
import Moment from 'react-moment';

export class Rounds extends React.Component {
  renderRows(roundsData) {
    return Object.keys(this.props.roundsData).reverse().map(key => {
      const round = this.props.roundsData[key];
      return (
        <tr
          onClick={() => {this.props.onClick(round.id)}}
          className="tr-hover"
          key={round.id}
        >
          <td><Moment format="YYYY-MM-DD">{round['date']}</Moment></td>
          <td>{round['course']}</td>
          <td className="align-right">{round['total_strokes']}</td>
          <td className="align-right">{round['total_putts']}</td>
          <td className="align-right">{round['total_gir']}</td>
          <td className="align-right">{round['handicap_index']}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th className="align-left">date</th>
            <th className="align-left">course</th>
            <th className="align-right">score</th>
            <th className="align-right">putts</th>
            <th className="align-right">girs</th>
            <th className="align-right">hdcp</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows(this.props.roundsData)}
        </tbody>
      </table>
    );
  }
}
