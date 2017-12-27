import React from 'react';

// styles
const alignLeft = {textAlign: 'left'};
const pointerRight = {cursor: 'pointer', textAlign: 'right'};

function StatsHeader(props) {
  return (
    <thead>
      <tr>
        <th style={alignLeft}>season:</th>
        {props.seasons.map(season => {
          return (
            <th
              onClick={() => props.onClick(season)}
              style={pointerRight}
              key={season}
            >
              {season === '2046' ? 'overall' : season}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function StatsRows(props) {
  const stats = {
    'strokes': 'scoring average',
    'putts': 'putts per round',
    'gir': 'greens per round',
    'handicap': 'handicap',
    'par3': 'par 3 average',
    'par4': 'par 4 average',
    'par5': 'par 5 average'
  };

  return (
    <tbody>
      {Object.keys(stats).map(stat => {
        return (
          <tr key={stat}>
            <td style={alignLeft}>{stats[stat]}:</td>
            {props.seasons.map(season => {
              return (
                <td
                  onClick={() => props.onClick(season)}
                  style={pointerRight}
                  key={season + '-' + stat}
                >
                  {props.statsData[season][stat]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export class Stats extends React.Component {
  render() {
    return (
      <table style={{width: '80%'}}>
        <StatsHeader
          seasons={Object.keys(this.props.statsData).sort().reverse()}
          onClick={season => this.props.clickedSeason(season)}
        />
        <StatsRows
          seasons={Object.keys(this.props.statsData).sort().reverse()}
          statsData={this.props.statsData}
          onClick={season => this.props.clickedSeason(season)}
        />
      </table>
    );
  }
}
