import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MovieSimpleCard from '../MovieSimpleCard/MovieSimpleCard';
import { Grid } from '@material-ui/core';
import { IMovie, MoviesType } from 'api/axios/theMovieDb/moviesApi/types';

type MoviesListProps = {
  movies: MoviesType;
};

const useStyles = makeStyles(() => ({
  card: {
    transition: 'transform 0.5s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)',
    },
  },
}));

export const MoviesList: React.FC<MoviesListProps> = props => {
  const classes = useStyles();
  const { movies } = props;

  return (
    <>
      <Grid container spacing={4} justify="space-between">
        {movies.map((movie: IMovie) => (
          <Grid item key={movie.id} className={classes.card}>
            <MovieSimpleCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
