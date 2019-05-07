import React from 'react';
import { DataTable } from 'react-native-paper';

const renderItem = (value, key, onClick) =>
  value === 'date' || value === 'course' ? (
    <DataTable.Title onPress={() => onClick(key)}>{value}</DataTable.Title>
  ) : (
    <DataTable.Title onPress={() => onClick(key)} numeric>
      {value}
    </DataTable.Title>
  );

export const RoundsHeader = ({ onClick }) => (
  <DataTable.Header>
    {renderItem('date', 'date', onClick)}
    {renderItem('course', 'course', onClick)}
    {renderItem('score', 'total_strokes', onClick)}
    {renderItem('front', 'front_9_strokes', onClick)}
    {renderItem('back', 'back_9_strokes', onClick)}
    {renderItem('putts', 'total_putts', onClick)}
    {renderItem('girs', 'total_gir', onClick)}
    {renderItem('hdcp', 'handicap_index', onClick)}
  </DataTable.Header>
);
