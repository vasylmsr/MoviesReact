import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?programming,react,vue)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4, 4),
  },
  copyrightWrapper: {
    marginTop: 'auto',
    padding: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AuthLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item sm={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square className={classes.paper}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
