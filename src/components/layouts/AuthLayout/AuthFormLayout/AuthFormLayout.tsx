// Core
import React from 'react';
import { Link } from 'react-router-dom';

// UI
import { makeStyles } from '@material-ui/core';
import AppLogo from 'assets/images/appLogo.png';

// Constants
import { ROUTES } from 'utils/constants/routes';

const useStyles = makeStyles(theme => ({
  body: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    'flex-direction': 'column',
  },
  appLogoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  appLogo: {
    maxWidth: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
}));

export const AuthFormLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.appLogoWrapper}>
        <Link to={ROUTES.MAIN}>
          <img src={AppLogo} alt="App Logo" className={classes.appLogo} />
        </Link>
      </div>
      {children}
    </div>
  );
};
