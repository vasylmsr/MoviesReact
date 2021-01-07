// Core
import React, { useMemo } from 'react';
import { useHistory } from 'react-router';

// UI
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { UiButton } from 'components/ui';
import landingCity from 'assets/images/landing_city3.jpg';

// Other
import clsx from 'clsx';
import { MetaTitle } from 'components/MetaTitle';
import { MOVIES_ROUTE } from 'utils/constants/routes';

const animations = {
  '@keyframes upToDown': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};
const useStyles = makeStyles((theme: Theme) => ({
  ...animations,
  header: {
    textTransform: 'uppercase',
    fontSize: '65px',
    '@media (max-width:600px)': {
      fontSize: '4em',
    },
    animationName: '$upToDown',
    animationDuration: '2s',
  },
  text: {
    color: 'white',
    fontWeight: 800,
    textAlign: 'center',
    padding: theme.spacing(1),
    textShadow: '3px 7px 15px rgba(2,2,2)',
  },
  quote: {
    opacity: 0,
    animationName: '$upToDown',
    animationDuration: '2s',
    animationDelay: '0.7s',
    animationFillMode: 'forwards',
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

function getRandomQuote(): string {
  const quotes: Array<string> = [
    'It does not matter how slowly you go so long as you do not stop.',
    'Success does not come to you … you go to it',
    'There are no shortcuts to any place worth going', // «К достойной цели нет коротких путей».
    'It’s never too late to be what you might have been',
    'Memories take us back, dreams take us forward',
    'Remember that the most dangerous prison is the one in your head',
  ];
  const randomQuoteNumber = Math.round(Math.random() * (quotes.length - 1));
  return quotes[randomQuoteNumber];
}

const Landing: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const quote = useMemo(() => getRandomQuote(), []);
  const goToApplication = () => history.push(MOVIES_ROUTE);

  return (
    <>
      <MetaTitle title="Vasyl Mysiura" />
      <section className={classes.mainSection}>
        <Typography component="h1" variant="h1" className={clsx(classes.header, classes.text)}>
          Vasyl Mysiura
        </Typography>
        <hr className={classes.line} />
        <Typography className={clsx(classes.text, classes.quote)} component="h2" variant="h4">
          &laquo;
          {quote}
          &raquo;
        </Typography>

        <UiButton className={classes.mainSection__button} onClick={goToApplication}>
          View Movies App
        </UiButton>
      </section>
    </>
  );
};

export default Landing;
