import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

export const store = createStore(
  persistReducer(
    { key: 'golf-stats', storage, whitelist: ['token'], timeout: null },
    rootReducer
  ),
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
