export type MovieFilterByType = 'popular' | 'top_rated';

export interface IMovie {
  id: number | string;
  title: string;
  release_date: string | null;
  backdrop_path: string | null;
  poster_path: string | null;
}

export type MoviesType = Array<IMovie>;

export interface IGetMoviesData {
  total_pages: number;
  results: MoviesType;
  page: number;
}
