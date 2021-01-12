import { Chip, Grid } from '@material-ui/core';
import React from 'react';
import { IMovieGenre } from 'api/axios/theMovieDb/moviesApi/types';

type PropsType = {
  genres: Array<IMovieGenre>;
};

const MovieGenresList: React.FC<PropsType> = props => {
  const { genres } = props;
  return (
    <Grid container spacing={2}>
      {genres?.map(genre => {
        return (
          <Grid key={genre.id} item>
            <Chip label={genre.name} color="secondary" />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MovieGenresList;
