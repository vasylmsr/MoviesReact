import React from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { HOME, MAIN } from '../../../../utils/constants/routes';
import Typography from "@material-ui/core/Typography";

interface ISidebarProps {
  onClose: () => void;
  isVisible: boolean;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export const Sidebar: React.FC<ISidebarProps> = (props: ISidebarProps): JSX.Element => {
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
