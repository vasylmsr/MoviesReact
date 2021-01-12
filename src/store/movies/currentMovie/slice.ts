import { fetchMovie } from './actions';
import { FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from 'utils/constants/other';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentMovieModule, ICurrentMovieState } from 'store/movies/currentMovie/types';
import { ITmdbError } from 'api/axios/theMovieDb/types';

const initialState: ICurrentMovieState = {
  data: null,
  meta: {
    status: IDLE_STATUS,
    error: null,
  },
};

export const currentMovieSlice = createSlice({
  name: currentMovieModule,
  initialState,
  reducers: {
    resetCurrentMovieState() {
      return initialState;
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchMovie.pending](state) {
      state.meta.status = LOADING_STATUS;
    },
    // @ts-ignore
    [fetchMovie.fulfilled](state, action: PayloadAction<any>) {
      state.meta.status = SUCCESS_STATUS;
      state.meta.error = null;
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchMovie.rejected](state, action: PayloadAction<ITmdbError>) {
      state.meta.status = FAILURE_STATUS;
      state.meta.error = action.payload;
    },
  },
});

export const { resetCurrentMovieState } = currentMovieSlice.actions;
