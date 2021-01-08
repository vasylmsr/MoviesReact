import BaseMovieDbApi from '../BaseMovieDbApi';
import { AxiosResponse } from 'axios';
import { IGetMoviesData } from './types';

class MoviesApi extends BaseMovieDbApi {
  private resource = '/movie';

  getMovies(params: any): Promise<AxiosResponse<IGetMoviesData>> {
    const sortBy = params?.sortBy || 'popular';
    const newParams = { ...params };
    // eslint-disable-next-line no-unused-expressions
    newParams?.sortBy && delete newParams?.sortBy;
    return this.get(`${this.resource}/${sortBy}`, { params });
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;
