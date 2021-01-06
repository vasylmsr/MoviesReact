import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  body: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    'flex-direction': 'column',
  },
}));

export const AuthFormLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.body}>{children}</div>;
};
