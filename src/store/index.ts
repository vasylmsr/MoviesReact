import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'store/auth/slice';
import { postsReducer } from './posts/reducer';
import { moviesReducer } from 'store/movies/reducer';
import { layoutReducer } from 'store/layout/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  movies: moviesReducer,
  layout: layoutReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: true, serializableCheck: false })],
});

export default store;
