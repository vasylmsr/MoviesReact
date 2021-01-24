import React from 'react';
import { ListItem, ListItemText, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IListLink } from 'components/layouts/HomeLayout/Sidebar/Sidebar';
import { makeStyles } from '@material-ui/core/styles';

type MenuListLinkProps = {
  link: IListLink;
  isActive: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  listTextLink: {
    color: (props: MenuListLinkProps) => (props.isActive ? theme.palette.secondary.main : 'black'),
  },
}));

const MenuListLink: React.FC<MenuListLinkProps> = props => {
  const { link } = props;
  const styles = useStyles(props);
  return (
    <ListItem button component={Link} to={link.path}>
      <ListItemText className={styles.listTextLink}>{link.name}</ListItemText>
    </ListItem>
  );
};

export default MenuListLink;
