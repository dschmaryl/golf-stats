import React, { Component } from 'react';
import axios from 'axios';

class Stats extends Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('http://https://golf-stats.herokuapp.com/api/user/3')
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
      <div className="stats">
        <p>{this.state.userData.username}</p>
      </div>
    );
  }
}

export default Stats;
