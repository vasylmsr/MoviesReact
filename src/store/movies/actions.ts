import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonMoviesModule } from './types';
import moviesApi from '../../api/axios/theMovieDb/moviesApi/MoviesApi';
import { IGetMoviesData } from 'api/axios/theMovieDb/moviesApi/types';

export const fetchMovies = createAsyncThunk(
  `${commonMoviesModule}/fetchMoviesStatus`,
  async (filters: any): Promise<IGetMoviesData> => {
    const response = await moviesApi.getMovies(filters);
    return response.data;
  },
);
