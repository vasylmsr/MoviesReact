import BaseMovieDbApi from '../BaseMovieDbApi';
import { AxiosResponse } from 'axios';
import { IGetMoviesData } from './types';

class MoviesApi extends BaseMovieDbApi {
  private resource = '/movie';

  getMovies(params: any): Promise<AxiosResponse<IGetMoviesData>> {
    const filterBy = params?.filterBy || 'popular';
    const newParams = { ...params };
    // eslint-disable-next-line no-unused-expressions
    newParams?.filterBy && delete newParams?.filterBy;
    return this.get(`${this.resource}/${filterBy}`, { params });
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;
