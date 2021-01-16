import BaseMovieDbApi from '../BaseMovieDbApi';
import { AxiosResponse } from 'axios';
import { ICommonMoviesFilters, IGetMoviesData, IMovie, ISearchedMoviesFilters } from './types';

class MoviesApi extends BaseMovieDbApi {
  private resource = '/movie';

  getMovies(params: ICommonMoviesFilters): Promise<AxiosResponse<IGetMoviesData>> {
    return this.get(`${this.resource}/${params.sortBy}`, { params });
  }

  getMovie(movieId: number): Promise<AxiosResponse<IMovie>> {
    return this.get(`${this.resource}/${movieId}`, {
      params: {
        append_to_response: 'videos',
      },
    });
  }

  searchMovies(params: ISearchedMoviesFilters): Promise<AxiosResponse<IGetMoviesData>> {
    return this.get(`search/movie`, { params });
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;
