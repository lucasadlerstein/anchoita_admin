import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import FilterListIcon from '@material-ui/icons/FilterList';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Inicio',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Platos',
      href: '/platos',
      icon: <RestaurantIcon />
    },
    {
      title: 'Vinos',
      href: '/vinos',
      icon: <img src={'images/wine-bottle.png'} height={25} width={25}/>
    },
    {
      title: 'Cócteles y Bebidas',
      href: '/cocteles',
      icon: <LocalBarIcon />
    },
    {
      title: 'Platos Ocultos',
      href: '/platos-ocultos',
      icon: <VisibilityOffOutlinedIcon />
    },
    {
      title: 'Vinos Ocultos',
      href: '/vinos-ocultos',
      icon: <VisibilityOffOutlinedIcon />
    },
    {
      title: 'Cócteles Ocultos',
      href: '/cocteles-ocultos',
      icon: <VisibilityOffOutlinedIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;