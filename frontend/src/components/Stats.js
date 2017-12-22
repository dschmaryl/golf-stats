import React from 'react';

// styles
const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
// const cursorPointer = {cursor: 'pointer'};

function StatsHeader(props) {
  return (
    <thead>
      <tr>
        <th style={alignLeft}>season:</th>
        {props.seasons.map(season => {
          return (
            <th style={alignRight} key={season}>
              {season === '2046' ? 'overall' : season}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function StatsRows(props) {
  const stats = ['strokes', 'putts', 'gir', 'handicap', 'par3', 'par4', 'par5'];
  return (
    <tbody>
      {stats.map(stat => {
        return (
          <tr key={stat}>
            <td style={alignLeft}>{stat}:</td>
            {props.seasons.map(season => {
              return (
                <td style={alignRight} key={season + '-' + stat}>
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
        />
        <StatsRows
          seasons={Object.keys(this.props.statsData).sort().reverse()}
          statsData={this.props.statsData}
        />
      </table>
    );
  }
}
