import React, { useState } from 'react';
import { MainMenu } from './MainMenu/MainMenu';
import { Sidebar } from './Sidebar/Sidebar';

const HomeLayout: React.FC = props => {
  const { children } = props;
  const [isSidebarVisible, setSidebarVisibility] = useState<boolean>(false);
  return (
    <div>
      <Sidebar onClose={() => setSidebarVisibility(false)} isVisible={isSidebarVisible} />
      <MainMenu openSidebar={() => setSidebarVisibility(true)} />
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
