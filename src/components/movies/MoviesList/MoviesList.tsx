import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
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

  return (
    <>
      <Grid container spacing={4} justify="center">
        {movies.map((movie: IMovie) => (
          <Grid item key={movie.id}>
            <MovieSimpleCard movie={movie} className={classes.card} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MoviesList;
