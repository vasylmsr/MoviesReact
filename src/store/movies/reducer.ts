import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { commonMoviesModule, IMoviesReducer } from './types';
import { fetchMovies } from './actions';
import { FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from 'utils/constants/other';

const initialState: IMoviesReducer = {
  moviesList: [],
  totalPages: 1,
  filters: {
    page: 1,
    sortBy: 'popular',
  },
  meta: {
    status: IDLE_STATUS,
    error: null,
  },
};

function getMoviesSlice(moduleName: string) {
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
      [fetchMovies.pending](state) {
        state.meta.status = LOADING_STATUS;
      },
      // @ts-ignore
      [fetchMovies.fulfilled](state, action: any) {
        state.meta.status = SUCCESS_STATUS;
        state.moviesList = action.payload.results;
        state.totalPages = action.payload.total_pages;
      },
      // @ts-ignore
      [fetchMovies.rejected](state, action: any) {
        state.meta.status = FAILURE_STATUS;
        state.meta.error = action.payload;
      },
    },
  });
}

const commonMoviesSlice = getMoviesSlice(commonMoviesModule);
export const { setFilter } = commonMoviesSlice.actions;

export const moviesReducer = combineReducers({
  commonMovies: commonMoviesSlice.reducer,
});
