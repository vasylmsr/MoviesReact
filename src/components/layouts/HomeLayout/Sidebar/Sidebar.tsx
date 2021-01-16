// Core
import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

// Instruments
import {
  List,
  Drawer,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ROUTES } from 'utils/constants/routes';
import { RootStateType } from 'store';

interface ISidebarProps {
  onClose: () => void;
  isVisible: boolean;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const { HOME, MAIN, MOVIES, USER_PROFILE, SEARCH_MOVIES } = ROUTES;

export const Sidebar: React.FC<ISidebarProps> = props => {
  const { onClose, isVisible } = props;
  const history = useHistory();
  const classes = useStyles();
  const { user } = useSelector((state: RootStateType) => state.auth);
  return (
    <Drawer open={isVisible} onClose={onClose}>
      <div className={classes.list}>
        <List component="nav">
          <ListItem>
            <Typography variant="h6">{`Hello,  ${user?.displayName}!`}</Typography>
          </ListItem>

          <Divider />

          <ListItem button onClick={() => history.push(MAIN)}>
            <ListItemText primary="Landing" />
          </ListItem>

          <ListItem button onClick={() => history.push(HOME)}>
            <ListItemText primary="Posts" />
          </ListItem>

          <ListItem button onClick={() => history.push(USER_PROFILE)}>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button onClick={() => history.push(MOVIES)}>
            <ListItemText primary="Movies" />
          </ListItem>

          <ListItem button onClick={() => history.push(SEARCH_MOVIES)}>
            <ListItemText primary="Search movies" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
