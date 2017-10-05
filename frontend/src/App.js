import React, {Component} from 'react';

import Stats from './components/Stats';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="header">
          <h2>golf-stats</h2>
        </div>
        <div className="body">
          <Stats />
        </div>
      </div>
    );
  }
}

export default App
