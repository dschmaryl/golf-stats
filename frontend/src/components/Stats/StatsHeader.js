import React from 'react';
import styled from 'styled-components';

const SeasonTh = styled.th`
  cursor: pointer;
  text-align: right;
`;

export function StatsHeader(props) {
  return (
    <thead>
      <tr>
        <th>season:</th>
        {props.seasons.map(season => {
          return (
            <SeasonTh
              onClick={() => props.onClick(season)}
              key={season}
            >
              {season === '2046' ? 'overall' : season}
            </SeasonTh>
          );
        })}
      </tr>
    </thead>
  );
}
