import { StatusType } from '../helpers';
import { MovieSortingType, MoviesType } from 'api/axios/theMovieDb/moviesApi/types';

export interface IMoviesReducer {
  moviesList: MoviesType;
  totalPages: number;
  filters: {
    page: number;
    sortBy: MovieSortingType;
  };
  meta: StatusType;
}

export const commonMoviesModule = 'movies';
