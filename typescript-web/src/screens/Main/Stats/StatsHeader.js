import React from 'react';
import { DataTable } from 'react-native-paper';

export const StatsHeader = ({ seasons, onClick }) => (
  <DataTable.Header>
    <DataTable.Title>season:</DataTable.Title>
    {seasons.map(season => (
      <DataTable.Title key={season} onPress={() => onClick(season)} numeric>
        {season === '2046' ? 'overall' : season}
      </DataTable.Title>
    ))}
  </DataTable.Header>
);
