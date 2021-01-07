import { StatusType } from '../helpers';
import { MovieFilterByType, MoviesType } from 'api/axios/theMovieDb/moviesApi/types';

export interface IMoviesReducer {
  moviesList: MoviesType;
  totalPages: number;
  filters: {
    page: number;
    filterBy: MovieFilterByType;
  };
  meta: StatusType;
}

export const commonMoviesModule = 'movies';
