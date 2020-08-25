import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { UiButton } from "../../../ui/UiButton/UiButton";
import { useHistory } from "react-router";
import { MAIN } from "../../../../utils/constants/routes";

interface ISidebarProps {
  onClose: () => void;
  isVisible: boolean;
}

export const Sidebar: React.FC<ISidebarProps> = (props: ISidebarProps): JSX.Element => {
  const { onClose, isVisible } = props;
  const history = useHistory();
  return <Drawer open={isVisible} onClose={onClose}><UiButton onClick={() => history.push(MAIN)}>MAIN</UiButton></Drawer>;
};
