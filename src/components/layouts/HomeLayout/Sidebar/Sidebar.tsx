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
import { HOME, MAIN, MOVIES_ROUTE, USER_PROFILE_ROUTE } from 'utils/constants/routes';
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

          <ListItem button onClick={() => history.push(USER_PROFILE_ROUTE)}>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button onClick={() => history.push(MOVIES_ROUTE)}>
            <ListItemText primary="Movies" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
