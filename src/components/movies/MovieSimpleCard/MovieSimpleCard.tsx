import React from 'react';
import { makeStyles, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { TMDB_IMAGE_URL } from 'utils/constants/other';
import { formatDate } from 'utils/helpers';
import { IMovie } from 'api/axios/theMovieDb/moviesApi/types';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    height: '100%',
  },
});

type MovieSimpleCardProps = {
  movie: IMovie;
  className?: any;
};

const MovieSimpleCard: React.FC<MovieSimpleCardProps> = props => {
  const classes = useStyles();

  const { movie, className } = props;
  const posterImg = `${TMDB_IMAGE_URL.medium}${movie.poster_path || movie.backdrop_path}`;
  const releaseDate = movie.release_date && formatDate(movie.release_date);

  return (
    <Card className={clsx(classes.root, className)}>
      <div>
        <CardMedia component="img" height="330" image={posterImg} alt={movie.title} />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {movie.title}
          </Typography>
          {releaseDate && (
            <Typography variant="body2" color="textSecondary" component="p">
              {`Release: ${releaseDate}`}
            </Typography>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default React.memo(MovieSimpleCard);
