import MoviesList from 'components/movies/MoviesList/MoviesList';
import { Pagination, PaginationProps } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import React from 'react';
import { MoviesType } from 'api/axios/theMovieDb/moviesApi/types';

type PropsType = PaginationProps & {
  list: MoviesType;
};

const MoviesPaginatedList: React.FC<PropsType> = props => {
  const { count, page, onChange, list } = props;
  return (
    <Grid container justify="center">
      <MoviesList movies={list} />
      <Pagination
        style={{ marginTop: 30 }}
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={onChange}
      />
    </Grid>
  );
};

export default MoviesPaginatedList;
