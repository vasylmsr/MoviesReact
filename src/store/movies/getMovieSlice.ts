import { IMoviesReducer } from 'store/movies/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FAILURE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from 'utils/constants/other';
import { IGetMoviesData } from 'api/axios/theMovieDb/moviesApi/types';
import { ITmdbError } from 'api/axios/theMovieDb/types';

interface IGetMovieSlice<T> {
  moduleName: string;
  thunkAsyncActions: any;
  initialState: IMoviesReducer<T>;
}

export function getMovieSlice<FiltersType>({
  moduleName,
  thunkAsyncActions,
  initialState,
}: IGetMovieSlice<FiltersType>) {
  return createSlice({
    name: moduleName,
    initialState,
    reducers: {
      setFilter(state, action: any) {
        state.filters = {
          ...state.filters,
          ...action.payload,
        };
      },
    },
    extraReducers: {
      // @ts-ignore
      [thunkAsyncActions.fetchMovies.pending](state) {
        state.meta.status = LOADING_STATUS;
      },
      // @ts-ignore
      [thunkAsyncActions.fetchMovies.fulfilled](state, action: PayloadAction<IGetMoviesData>) {
        state.meta.status = SUCCESS_STATUS;
        state.list = action.payload.results;
        state.totalPages = action.payload.total_pages;
      },
      // @ts-ignore
      [thunkAsyncActions.fetchMovies.rejected](state, action: PayloadAction<ITmdbError>) {
        state.meta.status = FAILURE_STATUS;
        state.meta.error = action.payload;
      },
    },
  });
}
