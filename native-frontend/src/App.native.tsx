import React from 'react';

import { ReduxProvider } from './store';
import { PaperProvider } from './paper';
import { AppContainer } from './AppContainer';

export const url =
  'http://' + (__DEV__ ? '10.0.0.3:5000' : 'golf-stats.herokuapp.com');

export const App = () => (
  <ReduxProvider>
    <PaperProvider>
      <AppContainer />
    </PaperProvider>
  </ReduxProvider>
);
