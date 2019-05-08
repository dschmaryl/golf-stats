import React from 'react';
import { Provider } from 'react-native-paper';

export const PaperProvider = ({ children }: { children: any }) => (
  <Provider>{children}</Provider>
);
