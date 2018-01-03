import React from 'react';
import axios from 'axios';
import { StatsHeader } from './StatsHeader';
import { StatsList } from './StatsList';

export class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('/api/user/' + this.props.userData['id'] + '/stats')
      .then(statsData => {
        if (statsData['error']) {
          this.setState({requestFailed: true});
        } else {
          this.setState({statsData: statsData.data});
        }
      })
      .catch(() => this.setState({requestFailed: true}));
  }

  render() {
    if (!this.state.statsData) {
      if (this.state.requestFailed) {
        return <p>error gettings stats</p>;
      } else {
        return <p>loading stats</p>;
      }
    }

    return (
      <table style={{width: '80%'}}>
        <StatsHeader
          seasons={Object.keys(this.state.statsData).sort().reverse()}
          onClick={season => this.props.clickedSeason(season)}
        />
        <StatsList
          seasons={Object.keys(this.state.statsData).sort().reverse()}
          statsData={this.state.statsData}
          onClick={season => this.props.clickedSeason(season)}
        />
      </table>
    );
  }
}
