import { StatusType } from 'store/helpers';
import { useDispatch } from 'react-redux';
import useMainLayoutLoading from 'hooks/useMainLayoutLoader';
import { useEffect, useRef } from 'react';
import { setQueryStringValues } from 'utils/queryString';

interface IUseMoviesList<T extends IBaseFilter> {
  filters: T;
  meta: StatusType;
  fetchMovies: (filters: T) => any;
  setFilter: (filters: any) => any;
}

interface IBaseFilter {
  page?: number;
}

export default function useMoviesList<T extends IBaseFilter>({
  filters,
  meta,
  fetchMovies,
  setFilter,
}: IUseMoviesList<T>) {
  const dispatch = useDispatch();

  useMainLayoutLoading(meta.status);
  const mountRef = useRef(false);
  useEffect(() => {
    if (mountRef.current) {
      setQueryStringValues(filters);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchMovies(filters);
    } else {
      mountRef.current = true;
    }
  }, [filters, fetchMovies, setFilter]);

  const setPaginationPage = (e: any, page: number) => dispatch(setFilter({ page }));

  return {
    setPaginationPage,
  };
}
