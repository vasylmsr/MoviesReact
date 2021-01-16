import { createAsyncThunk } from '@reduxjs/toolkit';
import { foundMoviesSliceModule } from './types';
import moviesApi from 'api/axios/theMovieDb/moviesApi/MoviesApi';
import { IGetMoviesData, ISearchedMoviesFilters } from 'api/axios/theMovieDb/moviesApi/types';

import store from 'store';
import { debounce } from 'utils/helpers';

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

export const boundFetchMoviesActionDebounce = debounce(
  filters => store.dispatch(fetchMovies(filters)),
  500,
);

export const foundMoviesActions = {
  fetchMovies,
};
