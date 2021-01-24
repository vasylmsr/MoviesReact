import React, { useState } from 'react';
import { MainMenu } from './MainMenu/MainMenu';
import { Sidebar } from './Sidebar/Sidebar';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  body: {
    paddingBottom: theme.spacing(2),
  },
}));

const HomeLayout: React.FC = props => {
  const { children } = props;
  const styles = useStyles();
  const [isSidebarVisible, setSidebarVisibility] = useState<boolean>(false);
  return (
    <div>
      <Sidebar onClose={() => setSidebarVisibility(false)} isVisible={isSidebarVisible} />
      <MainMenu openSidebar={() => setSidebarVisibility(true)} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default HomeLayout;
