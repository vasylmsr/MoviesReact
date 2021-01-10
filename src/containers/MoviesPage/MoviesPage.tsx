// Core
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { RootStateType } from 'store';
import { setFilter } from 'store/movies/commonMovies/slice';
import { fetchMovies } from 'store/movies/commonMovies/actions';
// UI
import { Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import MoviesList from 'components/movies/MoviesList/MoviesList';
import SortingGroupButton from 'components/movies/SortingGroupButton/SortingGroupButton';

// Tools
import { getQueryStringValues, setQueryStringValues } from 'utils/queryString';
import { MetaTitle } from 'components/MetaTitle';
import { isSortingType } from 'api/axios/theMovieDb/moviesApi/types';
import useMainLayoutLoading from 'hooks/useMainLayoutLoader';

// Todo: implement data types
function getCheckedMoviesFilters(data: any) {
  return {
    page: data.page > 0 && data.page <= 1000 ? Number(data.page) : 1,
    sortBy: isSortingType(data.sortBy) ? data.sortBy : 'popular',
  };
}

const MoviesPage: React.FC = () => {
  // Store
  const dispatch = useDispatch();
  const { list, totalPages, filters, meta } = useSelector(
    (state: RootStateType) => state.movies.commonMovies,
  );

  useMainLayoutLoading(meta.status);

  // Make a query after first 'filters' changing
  const mountRef = useRef(false);
  useEffect(() => {
    if (mountRef.current) {
      setQueryStringValues(filters);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(fetchMovies(filters));
    } else {
      mountRef.current = true;
    }
  }, [dispatch, filters]);

  // Set filters from QueryString after first render
  useEffect(() => {
    const qsValues = getQueryStringValues();
    const newFilters = getCheckedMoviesFilters(qsValues);
    dispatch(setFilter(newFilters));
  }, [dispatch]);

  // Component event handlers
  const setPaginationPage = (e: any, page: number) => dispatch(setFilter({ page }));
  const handleSortingBtnClick = useCallback(
    (sortBy: string) => {
      dispatch(setFilter({ page: 1, sortBy }));
    },
    [dispatch],
  );

  return (
    <>
      <MetaTitle title="Movies" />
      <Container maxWidth="xl">
        <Grid container justify="center" style={{ marginBottom: 50 }}>
          <Grid item>
            <SortingGroupButton currentFilter={filters.sortBy} onClick={handleSortingBtnClick} />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <MoviesList movies={list} />
          <Pagination
            style={{ marginTop: 30 }}
            count={totalPages}
            page={filters.page}
            variant="outlined"
            shape="rounded"
            onChange={setPaginationPage}
          />
        </Grid>
      </Container>
    </>
  );
};

export default MoviesPage;
