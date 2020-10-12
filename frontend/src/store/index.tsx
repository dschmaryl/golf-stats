import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { auth } from './auth/reducer';
import { rounds } from './rounds/reducer';
import { stats } from './stats/reducer';

const rootReducer = combineReducers({ auth, rounds, stats });

const store = createStore(
	persistReducer(
		{ key: 'golf-stats', storage, whitelist: ['auth'] },
		rootReducer
	),
	applyMiddleware(thunk)
);

const persistor = persistStore(store);

// persistor.purge();

export const ReduxProvider = ({ children }: { children: any }) => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			{children}
		</PersistGate>
	</Provider>
);
