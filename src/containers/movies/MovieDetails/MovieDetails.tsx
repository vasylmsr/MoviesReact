// Core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// Store
import { RootStateType } from 'store';
import { resetCurrentMovieState } from 'store/movies/currentMovie/slice';
import { fetchMovie } from 'store/movies/currentMovie/actions';

import { Container, Theme, makeStyles } from '@material-ui/core';
import { MetaTitle } from 'components/MetaTitle';
import useMainLayoutLoader from 'hooks/useMainLayoutLoader';
import MovieMainCard from 'components/movies/detailedMovie/MovieMainCard/MovieMainCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { id } = useParams();
  const { data: movie, meta } = useSelector((state: RootStateType) => state.movies.currentMovie);
  useMainLayoutLoader(meta.status);
  useEffect(() => {
    dispatch(fetchMovie(id));
    return () => {
      dispatch(resetCurrentMovieState());
    };
  }, [dispatch, id]);

  return (
    <>
      <MetaTitle title={movie?.title || 'Movie details'} />
      {movie && (
        <Container maxWidth="lg" className={styles.root}>
          <MovieMainCard movie={movie} />
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
