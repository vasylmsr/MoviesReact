export const sortingTypes = ['popular', 'top_rated', 'upcoming'] as const;
export type MovieSortingType = typeof sortingTypes[number];
// Type guard
export const isSortingType = (value: MovieSortingType): value is MovieSortingType => {
  return sortingTypes.some(element => element === value);
};

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
