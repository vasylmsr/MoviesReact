import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

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

const FullSizeProgress: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.progressWrapper}>
      <CircularProgress />
    </div>
  );
};

export default FullSizeProgress;
