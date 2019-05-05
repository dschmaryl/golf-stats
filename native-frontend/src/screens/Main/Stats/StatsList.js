import React from 'react';
import { DataTable } from 'react-native-paper';

const statKeys = {
  strokes: 'scoring average',
  putts: 'putts per round',
  gir: 'greens per round',
  handicap: 'handicap',
  par3: 'par 3 average',
  par4: 'par 4 average',
  par5: 'par 5 average'
};

export const StatsList = ({ seasons, stats, onClick }) =>
  Object.keys(statKeys).map(stat => (
    <DataTable.Row key={stat}>
      <DataTable.Cell>{statKeys[stat]}:</DataTable.Cell>
      {seasons.map(season => (
        <DataTable.Cell
          onClick={() => onClick(season)}
          key={season + '-' + stat}
        >
          {stats[season][stat]}
        </DataTable.Cell>
      ))}
    </DataTable.Row>
  ));
