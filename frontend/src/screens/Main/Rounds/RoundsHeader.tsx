import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const renderItem = (value: string, key: string, onClick: Function) => (
  <TableCell
    align={value === 'date' || value === 'course' ? 'left' : 'right'}
    onClick={() => onClick(key)}
  >
    {value}
  </TableCell>
);

export const RoundsHeader: React.FC<{ onClick: Function }> = ({ onClick }) => (
  <TableHead style={{ cursor: 'pointer' }}>
    <TableRow>
      {renderItem('date', 'date', onClick)}
      {renderItem('course', 'course', onClick)}
      {renderItem('score', 'total_strokes', onClick)}
      {renderItem('front', 'front_9_strokes', onClick)}
      {renderItem('back', 'back_9_strokes', onClick)}
      {renderItem('putts', 'total_putts', onClick)}
      {renderItem('girs', 'total_gir', onClick)}
      {renderItem('hdcp', 'handicap_index', onClick)}
    </TableRow>
  </TableHead>
);
