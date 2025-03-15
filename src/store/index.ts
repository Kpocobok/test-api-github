import {combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {Persistor, persistReducer} from 'redux-persist';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {IPersit} from '../interfaces';
import app from './slice/app';

const persistConfig: IPersit = {
  key: 'test-api-github',
  storage,
  debug: true,
};

const rootReducers: Reducer = combineReducers({
  app,
});

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getter =>
    getter({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ['payload'], // разрешение передавать функции в redux только в data объекте
      },
    }),
});

export const persistor: Persistor = persistStore(store);
