import { AxiosInstance } from 'axios';

interface IMainApi {
  get: any;
  post: any;
  put: any;
  delete: any;
}

export default class MainApi implements IMainApi {
  protected axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get(url: string, options = {}) {
    return this.axiosInstance.get(url, { ...options });
  }

  post(url: string, data: any, options = {}) {
    return this.axiosInstance.post(url, data, { ...options });
  }

  put(url: string, data: any, options = {}) {
    return this.axiosInstance.put(url, data, { ...options });
  }

  delete(url: string, options: any) {
    return this.axiosInstance.delete(url, { ...options });
  }
}
