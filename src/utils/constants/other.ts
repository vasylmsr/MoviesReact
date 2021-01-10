export const IDLE_STATUS = 'idle'; // fetching not started yet
export const LOADING_STATUS = 'loading'; // currently fetching the data
export const SUCCESS_STATUS = 'success'; // data fetched successfully
export const FAILURE_STATUS = 'failure'; // data failed to fetch
const statuses = [IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS, FAILURE_STATUS] as const;
export type LoadingType = typeof statuses[number];

export interface IFirebaseApiError {
  code?: string;
  message: string;
}

export const TMDB_IMAGE_URL = {
  medium: 'https://image.tmdb.org/t/p/w300',
  large: 'https://image.tmdb.org/t/p/w1200',
  original: 'https://image.tmdb.org/t/p/original',
} as const;
