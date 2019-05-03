import React from 'react';
import styled from 'styled-components';

const SeasonTh = styled.th`
  cursor: pointer;
  text-align: right;
`;

export const StatsHeader = ({ seasons, onClick }) => (
  <thead>
    <tr>
      <th>season:</th>
      {seasons.map(season => (
        <SeasonTh onClick={() => onClick(season)} key={season}>
          {season === '2046' ? 'overall' : season}
        </SeasonTh>
      ))}
    </tr>
  </thead>
);
