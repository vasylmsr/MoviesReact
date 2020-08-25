import React, { ReactNode, useState } from 'react';
import { MainMenu } from './MainMenu/MainMenu';
import { Sidebar } from './Sidebar/Sidebar';

interface IHomeProps {
  children: ReactNode;
}

export const HomeLayout: React.FC<IHomeProps> = (props: IHomeProps): JSX.Element => {
  const { children } = props;
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  return (
    <div>
      <Sidebar onClose={() => setSidebarVisibility(false)} isVisible={isSidebarVisible} />
      <MainMenu openSidebar={() => setSidebarVisibility(true)} />
      <div>{children}</div>
    </div>
  );
};
