import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Copyright from '../../Copyright/Copyright';

interface IAuthLayout {
  children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?programming,react,vue,nature)',
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
  paper__content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AuthLayout({ children }: IAuthLayout) {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item sm={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square className={classes.paper}>
        <div className={classes.paper__content}>{children}</div>
        <Box mt={5} className={classes.copyrightWrapper}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
