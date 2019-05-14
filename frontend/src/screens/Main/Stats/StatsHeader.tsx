import React from 'react';
import styled from 'styled-components';

const SeasonTh = styled.th`
  cursor: pointer;
  text-align: right;
`;

interface PropTypes {
  seasons: Array<number>;
  onClick: Function;
}

export const StatsHeader: React.FC<PropTypes> = ({ seasons, onClick }) => (
  <thead>
    <tr>
      <th>season:</th>
      {seasons.map(season => (
        <SeasonTh key={season} onClick={() => onClick(season)}>
          {season === 2046 ? 'overall' : season}
        </SeasonTh>
      ))}
    </tr>
  </thead>
);
