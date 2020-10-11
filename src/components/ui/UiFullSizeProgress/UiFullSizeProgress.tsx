import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
}));

export const FullSizeProgress: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.progressWrapper}>
      <CircularProgress />
    </div>
  );
};
