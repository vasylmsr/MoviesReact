// Core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { RootStateType } from 'store';
import { setFilter } from 'store/movies/foundMovies/slice';
import { boundFetchMoviesActionDebounce } from 'store/movies/foundMovies/actions';
// UI
import { Container, Grid } from '@material-ui/core';
import { SearchTextField } from 'components/ui';

// Tools
import { MetaTitle } from 'components/MetaTitle';
import MoviesPaginatedList from 'components/movies/MoviesPaginatedList/MoviesPaginatedList';
import useMoviesList from 'hooks/useMoviesList';
import { getQueryStringValues } from 'utils/queryString';
import { IAnyObject } from 'utils/types';
import { capitalizeFirstLetter } from 'utils/helpers';

function modifyQueryParams(data: IAnyObject): { page: number; query: string } {
  return {
    page: data.page > 0 && data.page <= 1000 ? Number(data.page) : 1,
    query: data.query || '',
  };
}

const SearchMoviesPage: React.FC = () => {
  // Store
  const dispatch = useDispatch();
  const { list, totalPages, filters, meta } = useSelector(
    (state: RootStateType) => state.movies.foundMovies,
  );

  const { setPaginationPage } = useMoviesList({
    filters,
    meta,
    fetchMovies: boundFetchMoviesActionDebounce,
    setFilter,
  });

  // Set filters from QueryString after first render
  useEffect(() => {
    const qsValues = getQueryStringValues();
    const newFilters = modifyQueryParams(qsValues);
    if (newFilters.query.length) {
      dispatch(setFilter(newFilters));
    }
  }, [dispatch]);

  // Component event handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ page: 1, query: event.target.value }));
  };

  const metaTitle = capitalizeFirstLetter(filters.query) || 'Search movies';
  return (
    <>
      <MetaTitle title={metaTitle} />
      <Container maxWidth="xl">
        <Grid container justify="center" style={{ marginBottom: 50 }}>
          <Grid item>
            <SearchTextField
              onChange={handleInputChange}
              name="search"
              value={filters.query}
              variant="outlined"
              label="Enter movie here..."
            />
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

export default SearchMoviesPage;
