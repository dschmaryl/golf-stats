import React from 'react';
import axios from 'axios';
import './index.css';

class Stats extends React.Component {
  render() {
    const rounds = Object.keys(this.props.userData.rounds).map(key => {
      let round = this.props.userData.rounds[key];
      return (
        <li key={'round_' + key}>{round}</li>
      );
    });

    return (
      <div>
        <h3>{this.props.userData.username}</h3>
        <ul>{rounds}</ul>
      </div>
    );
  }
}

export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('https://golf-stats.herokuapp.com/api/user/3')
      .then((response) => this.setState({userData: response.data}))
      .catch(() => this.setState({requestFailed: true}))
  }

  render() {
    if (this.state.requestFailed) {
      return <p>Failed to retrieve data</p>
    }
    if (!this.state.userData) {
      return <p>Loading data...</p>
    }

    return (
      <div className="main">
        <div className="header">
          <h2>golf-stats</h2>
        </div>
        <div className="body">
          <Stats userData={this.state.userData} />
        </div>
      </div>
    );
  }
}
