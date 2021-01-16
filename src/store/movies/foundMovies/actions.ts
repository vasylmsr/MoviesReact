import { createAsyncThunk } from '@reduxjs/toolkit';
import { foundMoviesSliceModule } from './types';
import moviesApi from 'api/axios/theMovieDb/moviesApi/MoviesApi';
import { IGetMoviesData, ISearchedMoviesFilters } from 'api/axios/theMovieDb/moviesApi/types';

export const fetchMovies = createAsyncThunk(
  `${foundMoviesSliceModule}/fetchMoviesStatus`,
  async (filters: ISearchedMoviesFilters, { rejectWithValue }): Promise<IGetMoviesData | any> => {
    try {
      const response = await moviesApi.searchMovies(filters);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const foundMoviesActions = {
  fetchMovies,
};
