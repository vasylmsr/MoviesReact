import { StatusType } from '../helpers';
import { MoviesType } from 'api/axios/theMovieDb/moviesApi/types';

export interface IMoviesReducer<FiltersType> {
  list: MoviesType;
  totalPages: number;
  meta: StatusType;
  filters: FiltersType;
}
