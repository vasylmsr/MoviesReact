// Core
import React from 'react';

// UI
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/core/SvgIcon/SvgIcon';
import MovieGenresList from 'components/movies/detailedMovie/movieGenres/MovieGenresList';
import YoutubeDialog from 'components/dialogs/YoutubeDialog/YoutubeDialog';

// Other
import clsx from 'clsx';
import { TMDB_IMAGE_URL } from 'utils/constants/other';
import { IMovie, IMovieVideo } from 'api/axios/theMovieDb/moviesApi/types';
import { useModalWithData } from 'hooks/useModalWithState';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  card__posterWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.04)',
      padding: theme.spacing(2),
    },
  },
  card__poster: {
    width: 250,
  },
  card__content: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  card__bgBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  card__bgImage: {
    objectFit: 'cover',
    objectPosition: '0 0',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  card__bgOnImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(to right, rgba(88.63%, 91.37%, 91.76%, 1.00), rgba(88.63%, 91.37%, 91.76%, 0.84))',
  },
  card__body: {
    position: 'relative',
    zIndex: 1,
    color: '#3d3d3d',
  },
  card__header: {
    fontWeight: 600,
  },
  card__playTrailer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  card__blockContainer: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

type PropsType = {
  movie: IMovie;
};

const MovieMainCard: React.FC<PropsType> = props => {
  const { movie } = props;
  const styles = useStyles();
  const {
    isOpened: isVideoModalOpened,
    closeModal: closeVideoModal,
    data: videoForModal,
    setData: setVideoForModal,
  } = useModalWithData<IMovieVideo>();

  const posterImg = `${TMDB_IMAGE_URL.medium}${movie?.poster_path}`;
  const bgImg = `${TMDB_IMAGE_URL.large}${movie?.backdrop_path}`;

  return (
    <>
      {videoForModal && (
        <YoutubeDialog open={isVideoModalOpened} onClose={closeVideoModal} video={videoForModal} />
      )}
      <Card className={styles.card}>
        <div className={styles.card__posterWrapper}>
          <CardMedia
            component="img"
            className={styles.card__poster}
            image={posterImg}
            alt={movie.title}
          />
        </div>
        <CardContent className={styles.card__content}>
          <div className={styles.card__bgBlock}>
            <img alt={movie.title} className={styles.card__bgImage} src={bgImg} />
            <div className={styles.card__bgOnImage} />
          </div>
          <div className={styles.card__body}>
            <Typography component="h1" variant="h4" className={styles.card__header}>
              {movie.title}
            </Typography>
            <Typography style={{ fontStyle: 'italic' }} variant="caption">
              {movie.tagline}
            </Typography>

            <div className={styles.card__blockContainer}>
              <Typography variant="h6">Description</Typography>
              <Typography variant="body2">{movie.overview}</Typography>
            </div>

            {movie.genres && (
              <div className={styles.card__blockContainer}>
                <Typography variant="h6">Genres</Typography>
                <MovieGenresList genres={movie.genres} />
              </div>
            )}

            <Grid
              container
              spacing={1}
              onClick={() => setVideoForModal(() => movie.videos!.results[0])}
              className={clsx(styles.card__blockContainer, styles.card__playTrailer)}
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
    </>
  );
};

export default MovieMainCard;
