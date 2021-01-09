import { commonMoviesActions } from './actions';
import { IDLE_STATUS } from 'utils/constants/other';
import { IMoviesReducer } from 'store/movies/types';
import { commonMoviesModule } from 'store/movies/commonMovies/types';
import { ICommonMoviesFilters } from 'api/axios/theMovieDb/moviesApi/types';
import { getMovieSlice } from 'store/movies/getMovieSlice';

const initialState: IMoviesReducer<ICommonMoviesFilters> = {
  list: [],
  totalPages: 1,
  meta: {
    status: IDLE_STATUS,
    error: null,
  },
  filters: {
    page: 1,
    sortBy: 'popular',
  },
};

export const commonMoviesSlice = getMovieSlice<ICommonMoviesFilters>({
  moduleName: commonMoviesModule,
  thunkAsyncActions: commonMoviesActions,
  initialState,
});

export const { setFilter } = commonMoviesSlice.actions;
