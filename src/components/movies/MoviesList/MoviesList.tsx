import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import MovieSimpleCard from '../MovieSimpleCard/MovieSimpleCard';
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

const MoviesList: React.FC<MoviesListProps> = props => {
  const classes = useStyles();
  const { movies } = props;

  const moviesList: Array<React.ReactNode> = movies.map((movie: IMovie) => (
    <Grid item key={movie.id}>
      <MovieSimpleCard movie={movie} className={classes.card} />
    </Grid>
  ));

  return (
    <Grid container spacing={4} justify="center">
      {movies.length ? moviesList : <Typography variant="subtitle1">No data</Typography>}
    </Grid>
  );
};

export default MoviesList;
