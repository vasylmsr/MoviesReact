// Core
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { fetchMovies } from 'store/movies/actions';
import { RootStateType } from 'store';
import { setFilter } from 'store/movies/reducer';

// UI
import { MoviesList } from 'components/movies/MoviesList/MoviesList';
import { Pagination } from '@material-ui/lab';
import { Container, Grid } from '@material-ui/core';

// Tools
import { getQueryStringValues, setQueryStringValues } from 'utils/queryString';
import { MetaTitle } from 'components/MetaTitle';
import FilterByButton from 'components/movies/FilterByButton/FilterByButton';

const MoviesPage: React.FC = () => {
  const { moviesList, totalPages, filters } = useSelector(
    (state: RootStateType) => state.movies.commonMovies,
  );
  const dispatch = useDispatch();
  const mountRef = useRef(false);
  useEffect(() => {
    if (mountRef.current) {
      dispatch(fetchMovies(filters));
      setQueryStringValues(filters);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      mountRef.current = true;
    }
  }, [dispatch, filters]);

  // Set filters from QueryString after first render
  useEffect(() => {
    const qsValues = getQueryStringValues();
    const newFilters = {
      page: Number(qsValues.page) || 1,
      filterBy: qsValues.filterBy || 'popular',
    };
    dispatch(setFilter(newFilters));
  }, [dispatch]);

  const setPaginationPage = (e: any, page: number) => dispatch(setFilter({ page }));

  return (
    <>
      <MetaTitle title="Movies" />
      <Container maxWidth="xl">
        <Grid container justify="center" style={{ marginBottom: 50 }}>
          <Grid item xs={12} md={3}>
            <FilterByButton
              currentFilter={filters.filterBy}
              onClick={(filterBy: string) => {
                dispatch(setFilter({ filterBy }));
              }}
            />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <MoviesList movies={moviesList} />
          <Pagination
            style={{ marginTop: '30px' }}
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
