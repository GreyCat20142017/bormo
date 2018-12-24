import React from 'react';
import ToolbarLink from './ToolbarLink';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  menuList: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }      
  },

  asideText: {
   [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  menuLink: {
    color: theme.palette.primary.contrastText,   
    textDecoration: 'none'
  },
});

const BormoToolbar = ({classes})  => (

  <nav className='navigation'>
  	<MenuList className={classes.menuList}>
      <MenuItem className={classes.menuItem}><ToolbarLink exact to='/' className={classes.menuLink}>Главная</ToolbarLink></MenuItem>
      <MenuItem className={classes.menuItem}><ToolbarLink to='/bormo' className={classes.menuLink}>Бормотунчик</ToolbarLink></MenuItem>
      <MenuItem className={classes.menuItem}><ToolbarLink to='/control' className={classes.menuLink}>Контроль</ToolbarLink></MenuItem>
      <MenuItem className={classes.menuItem}><ToolbarLink to='/reversecontrol' className={classes.menuLink}>Обратный контроль</ToolbarLink></MenuItem>
      <MenuItem className={classes.menuItem}><ToolbarLink to='/spelling' className={classes.menuLink}>Правописание</ToolbarLink></MenuItem>
      <MenuItem className={classes.menuItem}><ToolbarLink to='/check' className={classes.menuLink}>Проверка</ToolbarLink></MenuItem>
    </MenuList>  
  </nav>
 
);

export default withStyles(styles)(BormoToolbar);

