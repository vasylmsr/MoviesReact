import React, { useEffect } from 'react';
import { MetaTitle } from 'components/MetaTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { fetchMovie } from 'store/movies/currentMovie/actions';
import { resetCurrentMovieState } from 'store/movies/currentMovie/slice';
import { useParams } from 'react-router';
import useMainLayoutLoader from 'hooks/useMainLayoutLoader';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Theme,
  Grid,
} from '@material-ui/core';
import { TMDB_IMAGE_URL } from 'utils/constants/other';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import clsx from 'clsx';
import MovieGenresList from 'components/movies/detailedMovie/movieGenres/MovieGenresList';
import YoutubeDialog from 'components/dialogs/YoutubeDialog/YoutubeDialog';
import { useModalWithData } from 'hooks/useModalWithState';
import { IMovieVideo } from 'api/axios/theMovieDb/moviesApi/types';
// @ts-ignore
import MetaTags from 'react-meta-tags';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  movieCard: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  movieCard__posterWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.04)',
      padding: theme.spacing(2),
    },
  },
  movieCard__poster: {
    width: 250,
  },
  movieCard__content: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  movieCard__bgBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  movieCard__bgImage: {
    objectFit: 'cover',
    objectPosition: '0 0',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  movieCard__bgOnImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(to right, rgba(88.63%, 91.37%, 91.76%, 1.00), rgba(88.63%, 91.37%, 91.76%, 0.84))',
  },
  movieCard__body: {
    position: 'relative',
    zIndex: 1,
    color: '#3d3d3d',
  },
  movieCard__header: {
    fontWeight: 600,
  },
  movieCard__playTrailer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  movieCard__blockContainer: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: movie, meta } = useSelector((state: RootStateType) => state.movies.currentMovie);

  const {
    isOpened: isVideoModalOpened,
    closeModal: closeVideoModal,
    data: videoForModal,
    setData: setVideoForModal,
  } = useModalWithData<IMovieVideo>();

  const styles = useStyles();
  useMainLayoutLoader(meta.status);
  useEffect(() => {
    dispatch(fetchMovie(id));
    return () => {
      dispatch(resetCurrentMovieState());
    };
  }, [dispatch, id]);

  const posterImg =
    `${TMDB_IMAGE_URL.medium}${movie?.poster_path}` ||
    'https://znaiwifi.com/wp-content/uploads/2018/01/hqdefault.jpg';
  return (
    <>
      <MetaTags>
        <meta property="og:title" content={movie?.title || 'Test title'} />
        <meta property="og:description" content={movie?.overview || 'Test description'} />
        <meta property="og:image" content={posterImg} />
        <MetaTitle title={movie?.title || 'Current movie'} />
      </MetaTags>
      {videoForModal && (
        <YoutubeDialog open={isVideoModalOpened} onClose={closeVideoModal} video={videoForModal} />
      )}
      {movie && (
        <Container maxWidth="lg" className={styles.root}>
          <Card className={styles.movieCard}>
            <div className={styles.movieCard__posterWrapper}>
              <CardMedia
                component="img"
                className={styles.movieCard__poster}
                image={posterImg}
                alt={movie.title}
              />
            </div>
            <CardContent className={styles.movieCard__content}>
              <div className={styles.movieCard__bgBlock}>
                <img
                  alt={movie.title}
                  className={styles.movieCard__bgImage}
                  src={`${TMDB_IMAGE_URL.large}${movie?.backdrop_path}`}
                />
                <div className={styles.movieCard__bgOnImage} />
              </div>
              <div className={styles.movieCard__body}>
                <Typography component="h1" variant="h4" className={styles.movieCard__header}>
                  {movie.title}
                </Typography>
                <Typography style={{ fontStyle: 'italic' }} variant="caption">
                  {movie.tagline}
                </Typography>

                <div className={styles.movieCard__blockContainer}>
                  <Typography variant="h6">Description</Typography>
                  <Typography variant="body2">{movie.overview}</Typography>
                </div>

                {movie.genres && (
                  <div className={styles.movieCard__blockContainer}>
                    <Typography variant="h6">Genres</Typography>
                    <MovieGenresList genres={movie.genres} />
                  </div>
                )}

                <Grid
                  container
                  spacing={1}
                  onClick={() => setVideoForModal(() => movie.videos!.results[0])}
                  className={clsx(styles.movieCard__blockContainer, styles.movieCard__playTrailer)}
                >
                  <Grid item>
                    <PlayCircleOutlineIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Play trailer</Typography>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
