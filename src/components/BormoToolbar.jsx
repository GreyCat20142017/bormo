import React from 'react';
import ToolbarLink from './ToolbarLink';

import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import HeadsetIcon from '@material-ui/icons/Headset';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PACIcon from '@material-ui/icons/PlaylistAddCheck';

const styles = theme => ({
  menuList: {
    display: 'flex'
  },

  asideText: {
   [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  text: {
    marginLeft: '7px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      marginLeft: '0'
    }
  },
  menuLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.06)'
    },
     '&:active': {
      backgroundImage: 'linear-gradient(to bottom, ' +
        theme.palette.primary.light + ' 0%, ' +
        theme.palette.primary.main +' 50%, ' +
        theme.palette.primary.light + ' 100%)',
      boxShadow: '0 3px 5px 2px ' + theme.palette.primary.dark
    }
   }
});

const BormoToolbar = ({classes})  => (

  <nav className={classes.menuList}>
   <ToolbarLink exact to='/' className={classes.menuLink} title='Главная'>
    <HomeIcon  className={classes.icon} fontSize='small' color='inherit' />
    <span className={classes.text}>Главная</span>
   </ToolbarLink>

   <ToolbarLink to='/bormo' className={classes.menuLink} title='Бормотание'>
     <HeadsetIcon  className={classes.icon} fontSize='small' color='inherit' />
     <span className={classes.text}>Бормотание</span>
    </ToolbarLink>

   <ToolbarLink to='/control' className={classes.menuLink} title='Контроль'>
    <DoneIcon  className={classes.icon} fontSize='small' color='inherit' />
    <span className={classes.text}>Контроль</span>
   </ToolbarLink>

   <ToolbarLink to='/reversecontrol' className={classes.menuLink} title='Контроль наоборот'>
    <DoneAllIcon  className={classes.icon} fontSize='small' color='inherit' />
    <span className={classes.text}>Контроль наоборот</span>
   </ToolbarLink>


   <ToolbarLink to='/spelling' className={classes.menuLink} title='Правописание'>
    <PACIcon  className={classes.icon} fontSize='small' color='inherit' />
    <span className={classes.text}>Правописание</span>
   </ToolbarLink>


   <ToolbarLink to='/check' className={classes.menuLink} title='Проверка'>
    <ListAltIcon  className={classes.icon} fontSize='small' color='inherit' />
    <span className={classes.text}>Проверка</span>
   </ToolbarLink>
  </nav>

);

export default withStyles(styles)(BormoToolbar);

