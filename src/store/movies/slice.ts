import { combineReducers } from '@reduxjs/toolkit';
import { commonMoviesSlice } from 'store/movies/commonMovies/slice';
import { foundMoviesSlice } from 'store/movies/foundMovies/slice';

export const moviesReducer = combineReducers({
  commonMovies: commonMoviesSlice.reducer,
  foundMovies: foundMoviesSlice.reducer,
});
