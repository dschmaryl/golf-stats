import React from 'react';

import { ReduxProvider } from './store';
import { PaperProvider } from './paper';
import { AppContainer } from './AppContainer';

export const url = '';

export const App = () => (
  <ReduxProvider>
    <PaperProvider>
      <AppContainer />
    </PaperProvider>
  </ReduxProvider>
);
