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
import { MAIN } from 'utils/constants/routes';

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
  const { user } = useSelector((state: any) => state.auth);
  const userName: string = `${user?.firstName} ${user?.lastName}`;
  return (
    <Drawer open={isVisible} onClose={onClose}>
      <div className={classes.list}>
        <List component="nav">
          <ListItem>
            <Typography variant="h6">{`Hello,  ${userName}!`}</Typography>
          </ListItem>

          <Divider />

          <ListItem button onClick={() => history.push(MAIN)}>
            <ListItemText primary="Landing" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
