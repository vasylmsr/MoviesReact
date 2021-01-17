import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'store/auth/slice';
import { moviesReducer } from 'store/movies/reducer';
import { layoutReducer } from 'store/layout/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  layout: layoutReducer,
});

const { NODE_ENV } = process.env;

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: true, serializableCheck: false })],
  devTools: NODE_ENV === 'development',
});

export type RootStateType = ReturnType<typeof rootReducer>;
export default store;
