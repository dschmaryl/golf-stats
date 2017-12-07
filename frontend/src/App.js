import React from 'react';
import axios from 'axios';
import './index.css';

import { RoundList } from './components/RoundList';


export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('https://golf-stats.herokuapp.com/api/my_user_id')
      .then(userId => {
        if (userId.data['error']) {
          this.setState({requestFailed: true})
        } else {
          axios.get('https://golf-stats.herokuapp.com/api/user/' + userId.data.id)
            .then(userData => this.setState({userData: userData.data}))
            .catch(() => this.setState({requestFailed: true}))
        }
      })
      .catch(() => this.setState({requestFailed: true}))
  }

  render() {
    if (this.state.requestFailed) {
      return <p>Failed to retrieve data. Maybe check login</p>
    }
    if (!this.state.userData) {
      return <p>Loading user data...</p>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2>rounds list for {this.state.userData.username}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10">
            <RoundList userId={this.state.userData.id} />
          </div>
        </div>
      </div>
    );
  }
}
