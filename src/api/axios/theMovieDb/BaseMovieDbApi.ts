import axios, { AxiosInstance } from 'axios';
import BaseApi from '../common/BaseApi';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
// @ts-ignore
// eslint-disable-next-line new-cap
export const tmdbInstance: AxiosInstance = new axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
});

export default class BaseMovieDbApi extends BaseApi {
  constructor() {
    super(tmdbInstance);
  }
}
