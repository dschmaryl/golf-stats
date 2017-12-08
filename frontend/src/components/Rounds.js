import React from 'react';

export class Rounds extends React.Component {
  render() {
    const rounds = Object.keys(this.props.roundsData).reverse().map(key => {
      let round = this.props.roundsData[key];
      return (
        <tr key={'round_' + key}>
          <td>{round['date']}</td>
          <td>{round['course']}</td>
          <td className="align-right">{round['total_strokes']}</td>
          <td className="align-right">{round['total_putts']}</td>
          <td className="align-right">{round['total_gir']}</td>
          <td className="align-right">{round['handicap_index']}</td>
        </tr>
      );
    });

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
          {rounds}
        </tbody>
      </table>
    );
  }
}
