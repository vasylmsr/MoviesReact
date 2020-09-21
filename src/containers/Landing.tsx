import React from 'react';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { UiButton } from '../components/ui/UiButton/UiButton';
import { HOME } from '../utils/constants/routes';
import landingCity from '../assets/images/landing_city3.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textTransform: 'uppercase',
    fontSize: '65px',
    '@media (max-width:600px)': {
      fontSize: '4em',
    },
  },
  text: {
    color: 'white',
    fontWeight: 800,
    textAlign: 'center',
    padding: theme.spacing(1),
    textShadow: '3px 7px 15px rgba(2,2,2)',
  },

  mainSection: {
    backgroundImage: `url(${landingCity})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },

  mainSection__button: {
    marginTop: '40px',
    width: '200px',
    border: '2px solid white',
    color: 'white',
    background: 'transparent',
  },
  line: {
    height: '2px',
    margin: '40px 0',
    background: 'white',
    width: '100px',
    border: 'none',
  },
}));

export const Landing: React.FC = () => {
  const history = useHistory();
  const goToApplication = () => history.push(HOME);
  const classes = useStyles();
  return (
    <>
      <section className={classes.mainSection}>
        <Typography component="h1" variant="h1" className={clsx(classes.header, classes.text)}>
          Vasyl Mysiura
        </Typography>
        <hr className={classes.line} />
        <Typography className={classes.text} component="h2" variant="h4">
          &laquo;Success does not come to you … you go to it&raquo;
        </Typography>

        <UiButton className={classes.mainSection__button} onClick={goToApplication}>
          View Posts App
        </UiButton>
      </section>
    </>
  );
};
