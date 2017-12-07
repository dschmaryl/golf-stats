import React from 'react';
import axios from 'axios';

export class RoundList extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('https://golf-stats.herokuapp.com/api/user/' + this.props.userId + '/get_rounds')
      .then(rounds => this.setState({roundsData: rounds.data}))
      .catch(() => this.setState({requestFailed: true}))
  }

  render() {
    if (this.state.requestFailed) {
      return <p>Failed to retrieve data</p>
    }
    if (!this.state.roundsData) {
      return <p>Loading rounds data...</p>
    }

    const rounds = Object.keys(this.state.roundsData).map(key => {
      let round = this.state.roundsData[key];
      return (
        <tr key={'round_' + key}>
          <td>{round['date']}</td>
          <td>{round['course']}</td>
          <td class="align-right">{round['total_strokes']}</td>
          <td class="align-right">{round['total_putts']}</td>
          <td class="align-right">{round['total_gir']}</td>
          <td class="align-right">{round['handicap_index']}</td>
        </tr>
      );
    });

    return (
      <table className="table table-condensed table-hover">
        <thead>
          <tr>
            <th>date</th>
            <th>course</th>
            <th class="align-right">score</th>
            <th class="align-right">putts</th>
            <th class="align-right">girs</th>
            <th class="align-right">hdcp</th>
          </tr>
        </thead>
        <tbody>
          {rounds}
        </tbody>
      </table>
    );
  }
}
