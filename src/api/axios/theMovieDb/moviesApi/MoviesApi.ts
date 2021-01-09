import BaseMovieDbApi from '../BaseMovieDbApi';
import { AxiosResponse } from 'axios';
import { ICommonMoviesFilters, IGetMoviesData, ISearchedMoviesFilters } from './types';

class MoviesApi extends BaseMovieDbApi {
  private resource = '/movie';

  getMovies(params: ICommonMoviesFilters): Promise<AxiosResponse<IGetMoviesData>> {
    return this.get(`${this.resource}/${params.sortBy}`, { params });
  }

  searchMovies(params: ISearchedMoviesFilters): Promise<AxiosResponse<IGetMoviesData>> {
    return this.get(`search/movie`, params);
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;
