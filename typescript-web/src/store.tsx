import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { rootReducer } from './reducers';

const store = createStore(
  persistReducer(
    { key: 'golf-stats', storage, whitelist: ['token'] },
    rootReducer
  ),
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export const ReduxProvider = ({ children }: { children: any }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
