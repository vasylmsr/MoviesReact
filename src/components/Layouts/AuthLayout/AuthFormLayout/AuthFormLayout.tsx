import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../../Copyright/Copyright';

const useStyles = makeStyles(() => ({
  copyrightWrapper: {
    marginTop: 'auto',
    padding: '20px',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    'flex-direction': 'column',
  },
}));

export const AuthFormLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.body}>{children}</div>
      <Box mt={5} className={classes.copyrightWrapper}>
        <Copyright />
      </Box>
    </>
  );
};
