import { createAsyncThunk } from '@reduxjs/toolkit';
import { currentMovieModule } from './types';
import moviesApi from 'api/axios/theMovieDb/moviesApi/MoviesApi';

export const fetchMovie = createAsyncThunk(
  `${currentMovieModule}/fetchMovie`,
  async (id: number, { rejectWithValue }): Promise<any> => {
    try {
      const response = await moviesApi.getMovie(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
