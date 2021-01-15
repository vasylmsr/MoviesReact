import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppLogo from 'assets/images/logo192.png';
import { useHistory } from 'react-router';
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
  const history = useHistory();

  return (
    <div className={classes.body}>
      <div className={classes.appLogoWrapper}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={AppLogo}
          alt="App Logo"
          className={classes.appLogo}
          onClick={() => history.push(ROUTES.MAIN)}
        />
      </div>
      {children}
    </div>
  );
};
