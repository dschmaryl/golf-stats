import React from 'react';
import axios from 'axios';
import { RoundsHeader } from './RoundsHeader';
import { RoundsList } from './RoundsList';

export class Rounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSortedBy: '',
      lastSortReversed: false,
    };
  }

  componentDidMount() {
    axios.get('/api/user/' + this.props.userData['id'] + '/rounds')
      .then(roundsData => {
        if (roundsData['error']) {
          this.setState({requestFailed: true});
        } else {
          this.setState({roundsData: roundsData.data});
        }
      })
      .catch(() => this.setState({requestFailed: true}));
  }

  sortRounds(sortBy, reversed) {
    const roundsData = this.state.roundsData;
    let lastSortReversed = this.state.lastSortReversed;

    function sortRoundsData(sortBy, reversed) {
      if (sortBy === 'date') {
        if (reversed) {
          return Object.values(roundsData).reverse();
        } else {
          return Object.values(roundsData);
        }
      } else {
        return Object.values(roundsData).sort((a, b) => {
          if (sortBy === 'course') {
            if (reversed) {
              return b['course'] < a['course'];
            } else {
              return a['course'] < b['course'];
            }
          }
          if (reversed) {
            return b[sortBy] - a[sortBy];
          } else {
            return a[sortBy] - b[sortBy];
          }
        });
      }
    }
    if (sortBy === this.state.lastSortedBy) {
      this.setState({roundsData: sortRoundsData(sortBy, !lastSortReversed)});
    } else {
      this.setState({roundsData: sortRoundsData(sortBy, reversed)});
      lastSortReversed = !reversed;
    }
    this.setState({lastSortedBy: sortBy, lastSortReversed: !lastSortReversed});
  }

  seasonRoundsData() {
    if (!this.props.selectedSeason || this.props.selectedSeason === '2046') {
      return this.state.roundsData;
    } else {
      let seasonRounds = {};
      Object.keys(this.state.roundsData).forEach(k => {
        let year = new Date(this.state.roundsData[k]['date']).getFullYear();
        if (year.toString() === this.props.selectedSeason) {
          seasonRounds[k] = this.state.roundsData[k];
        }
      });
      return seasonRounds;
    }
  }

  render() {
    if (!this.state.roundsData) {
      if (this.state.requestFailed) {
        return <p>error getting rounds</p>;
      } else {
        return <p>loading rounds...</p>;
      }
    }

    return (
      <div>
        <RoundsHeader
          onClick={(value, reverse) => this.sortRounds(value, reverse)}
        />
        <RoundsList
          roundsData={this.seasonRoundsData()}
        />
      </div>
    );
  }
}
