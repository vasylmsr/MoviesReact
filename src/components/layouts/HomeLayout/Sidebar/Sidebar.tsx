// Core
import React from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

// Instruments
import { List, Drawer, ListItem, Divider, Typography, makeStyles } from '@material-ui/core';
import { ROUTES } from 'utils/constants/routes';
import { RootStateType } from 'store';
import MenuListLink from 'components/layouts/HomeLayout/Sidebar/MenuListLink';

const MemoizedLink = React.memo(MenuListLink);
const { MAIN, MOVIES, USER_PROFILE, SEARCH_MOVIES } = ROUTES;
const menuItems: Array<IListLink> = [
  { path: MAIN, name: 'Landing' },
  { path: USER_PROFILE, name: 'Profile' },
  { path: MOVIES, name: 'Movies' },
  { path: SEARCH_MOVIES, name: 'Search movies' },
];
const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export interface IListLink {
  path: string;
  name: string;
}

type SidebarProps = {
  onClose: () => void;
  isVisible: boolean;
};

export const Sidebar: React.FC<SidebarProps> = props => {
  const { onClose, isVisible } = props;
  const location = useLocation();
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

          {menuItems.map(item => {
            return (
              <MemoizedLink
                key={item.path}
                link={item}
                isActive={location.pathname === item.path}
              />
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};
