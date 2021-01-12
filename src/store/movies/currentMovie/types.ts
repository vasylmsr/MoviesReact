import { IMovie } from 'api/axios/theMovieDb/moviesApi/types';
import { StatusType } from 'store/helpers';

export const currentMovieModule = 'currentMovieModule';

export interface ICurrentMovieState {
  data: IMovie | null;
  meta: StatusType;
}
