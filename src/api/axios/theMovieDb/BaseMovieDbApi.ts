import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from '../common/BaseApi';

const TMDB_API_VERSION = 3;
const baseURL = `https://api.themoviedb.org/${TMDB_API_VERSION}`;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
// @ts-ignore
// eslint-disable-next-line new-cap
export const tmdbInstance: AxiosInstance = new axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
});

const responseInterceptor = (response: AxiosResponse) => response;
const rejectInterceptor = (error: AxiosError) => {
  const statusCode = error?.response?.status;
  switch (statusCode) {
    case 422: {
      return Promise.reject({
        code: statusCode,
        message: error?.response?.data.errors[0],
      });
    }
    case 401 || 404: {
      return Promise.reject({
        code: statusCode,
        message: error?.response?.data.status_message,
      });
    }
    default: {
      return Promise.reject(error);
    }
  }
};

tmdbInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);

export default class BaseMovieDbApi extends BaseApi {
  constructor() {
    super(tmdbInstance);
  }
}
