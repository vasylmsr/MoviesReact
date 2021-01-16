// Core
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { RootStateType } from 'store';
import { setFilter } from 'store/movies/commonMovies/slice';
import { fetchMovies } from 'store/movies/commonMovies/actions';
// UI
import { Container, Grid } from '@material-ui/core';
import SortingGroupButton from 'components/movies/SortingGroupButton/SortingGroupButton';

// Tools
import { getQueryStringValues } from 'utils/queryString';
import { MetaTitle } from 'components/MetaTitle';
import { isSortingType } from 'api/axios/theMovieDb/moviesApi/types';
import MoviesPaginatedList from 'components/movies/MoviesPaginatedList/MoviesPaginatedList';
import useMoviesList from 'hooks/useMoviesList';

function modifyQueryParams(data: any) {
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

  const { setPaginationPage } = useMoviesList({
    fetchMovies,
    filters,
    meta,
    setFilter,
  });

  // Set filters from QueryString after first render
  useEffect(() => {
    const qsValues = getQueryStringValues();
    const newFilters = modifyQueryParams(qsValues);
    dispatch(setFilter(newFilters));
  }, [dispatch]);

  // Component event handlers
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

        <MoviesPaginatedList
          list={list}
          count={totalPages}
          page={filters.page}
          onChange={setPaginationPage}
        />
      </Container>
    </>
  );
};

export default MoviesPage;
