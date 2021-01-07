// Core
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// UI
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { UiButton } from 'components/ui';

// Other
import { logout } from 'store/auth/sagas';
import { SIGN_IN } from 'utils/constants/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 100,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: 'black',
    },
    logoutButton: {
      backgroundColor: 'white',
      color: 'black',
      '&:hover': {
        background: '#e7e7e7',
      },
    },
  }),
);

interface IMainMenuProps {
  openSidebar: () => void;
}

export const MainMenu: React.FC<IMainMenuProps> = props => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const signOut = async () => {
    await dispatch(logout());
    history.push(SIGN_IN);
  };
  const { openSidebar } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <UiButton className={classes.logoutButton} onClick={signOut}>
            Logout
          </UiButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
