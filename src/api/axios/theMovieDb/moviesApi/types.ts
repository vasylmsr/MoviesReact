export const sortingTypes = ['popular', 'top_rated', 'upcoming'] as const;
export type MovieSortingType = typeof sortingTypes[number];
// Type guard
export const isSortingType = (value: MovieSortingType): value is MovieSortingType => {
  return sortingTypes.some(element => element === value);
};

export interface IMovieGenre {
  id: number;
  name: string;
}

export interface IMovieVideo {
  id: number;
  key: string;
  name: string;
}

export interface IMovie {
  id: number;
  title: string;
  release_date: string | null;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number | null;
  overview?: string;
  tagline?: string;
  genres?: Array<IMovieGenre>;
  videos?: { results: Array<IMovieVideo> };
}

export type MoviesType = Array<IMovie>;

// getMovies, searchMovies
export interface IGetMoviesData {
  total_pages: number;
  results: MoviesType;
  page: number;
}

// getMovies params
export interface ICommonMoviesFilters {
  page: number;
  sortBy: MovieSortingType;
}

// searchMovies params
export interface ISearchedMoviesFilters {
  page: number;
  query: string;
}
