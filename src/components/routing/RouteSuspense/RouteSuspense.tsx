import React, { ReactNode } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
}));

export const FullSizeProgress: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.progressWrapper}>
      <CircularProgress />
    </div>
  );
};

type RouteSuspenseProps = {
  children: ReactNode;
};

const RouteSuspense: React.FC<RouteSuspenseProps> = ({
  children,
}: RouteSuspenseProps): JSX.Element => {
  return <React.Suspense fallback={<FullSizeProgress />}>{children}</React.Suspense>;
};

export default RouteSuspense;
