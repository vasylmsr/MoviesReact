import { IDLE_STATUS } from 'utils/constants/other';
import { IMoviesReducer } from 'store/movies/types';
import { foundMoviesSliceModule } from 'store/movies/foundMovies/types';
import { foundMoviesActions } from 'store/movies/foundMovies/actions';
import { ISearchedMoviesFilters } from 'api/axios/theMovieDb/moviesApi/types';
import { getMovieSlice } from 'store/movies/getMovieSlice';

const initialState: IMoviesReducer<ISearchedMoviesFilters> = {
  list: [],
  totalPages: 1,
  meta: {
    status: IDLE_STATUS,
    error: null,
  },
  filters: {
    page: 1,
    query: '',
  },
};

export const foundMoviesSlice = getMovieSlice<ISearchedMoviesFilters>({
  moduleName: foundMoviesSliceModule,
  thunkAsyncActions: foundMoviesActions,
  initialState,
});

export const { setFilter } = foundMoviesSlice.actions;
