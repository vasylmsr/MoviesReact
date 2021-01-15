import React, { useCallback } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import MovieSimpleCard from '../MovieSimpleCard/MovieSimpleCard';
import { IMovie, MoviesType } from 'api/axios/theMovieDb/moviesApi/types';
import { useHistory } from 'react-router';
import { ROUTES } from 'utils/constants/routes';

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
  const history = useHistory();

  const goToMovieDetails = useCallback(
    (id: number) => {
      history.push(`${ROUTES.MOVIES}/${id}`);
    },
    [history],
  );

  const moviesList: Array<React.ReactNode> = movies.map((movie: IMovie) => (
    <Grid item key={movie.id}>
      <MovieSimpleCard movie={movie} className={classes.card} onCardClick={goToMovieDetails} />
    </Grid>
  ));

  return (
    <Grid container spacing={4} justify="center">
      {movies.length ? moviesList : <Typography variant="subtitle1">No data</Typography>}
    </Grid>
  );
};

export default MoviesList;
