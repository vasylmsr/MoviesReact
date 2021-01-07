import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { MainMenu } from './MainMenu/MainMenu';
import { Sidebar } from './Sidebar/Sidebar';

const useStyles = makeStyles(theme => ({
  body: {
    padding: theme.spacing(2),
  },
}));

const HomeLayout: React.FC = props => {
  const { children } = props;
  const classes = useStyles();
  const [isSidebarVisible, setSidebarVisibility] = useState<boolean>(false);
  return (
    <div>
      <Sidebar onClose={() => setSidebarVisibility(false)} isVisible={isSidebarVisible} />
      <MainMenu openSidebar={() => setSidebarVisibility(true)} />
      <div className={classes.body}>{children}</div>
    </div>
  );
};

export default HomeLayout;
