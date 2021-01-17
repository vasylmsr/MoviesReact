import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StatusType } from 'store/helpers';
import useMainLayoutLoading from 'hooks/useMainLayoutLoader';
import { setQueryStringValues } from 'utils/queryString';
import { IAnyObject } from 'utils/types';

interface IUseMoviesList<T extends IBaseFilter> {
  filters: T;
  meta: StatusType;
  fetchMovies: (filters: T) => any;
  setFilter: (filters: IAnyObject) => any;
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
      dispatch(fetchMovies(filters));
    } else {
      mountRef.current = true;
    }
  }, [dispatch, filters, fetchMovies, setFilter]);

  const setPaginationPage = (e: any, page: number) => dispatch(setFilter({ page }));

  return {
    setPaginationPage,
  };
}
