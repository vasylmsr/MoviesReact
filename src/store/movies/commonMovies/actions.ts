import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonMoviesModule } from './types';
import moviesApi from 'api/axios/theMovieDb/moviesApi/MoviesApi';
import { ICommonMoviesFilters, IGetMoviesData } from 'api/axios/theMovieDb/moviesApi/types';

export const fetchMovies = createAsyncThunk(
  `${commonMoviesModule}/fetchMoviesStatus`,
  async (filters: ICommonMoviesFilters, { rejectWithValue }): Promise<IGetMoviesData | any> => {
    try {
      const response = await moviesApi.getMovies(filters);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const commonMoviesActions = {
  fetchMovies,
};
