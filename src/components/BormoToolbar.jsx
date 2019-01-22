import React, {Fragment} from 'react';

import Menu from '@material-ui/core/Menu';

import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import HeadsetIcon from '@material-ui/icons/Headset';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PACIcon from '@material-ui/icons/PlaylistAddCheck';
import MenuIcon from '@material-ui/icons/Menu';

import ToolbarLink from './ToolbarLink';


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
      display: 'none'
    }
  },
  menuLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    textDecoration: 'none',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark
    },
    '&:focus': {
       boxShadow: `0 0 0 1px ${theme.palette.primary.light} inset`,
       backgroundColor: theme.palette.primary.light
    },
     '&:active': {
      backgroundImage: 'linear-gradient(to bottom, ' +
        theme.palette.primary.light + ' 0%, ' +
        theme.palette.primary.main +' 50%, ' +
        theme.palette.primary.light + ' 100%)',
      boxShadow: '0 3px 5px 2px ' + theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    }
   },

   mobileOn: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
     display: 'flex'
    }
  },

   mobileOff: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
     display: 'none'
    }
  },

  burgerOpened: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }
});

const BurgerContent = ({classes, burgerEl, onBurgerClick, onBurgerClose}) => (
     <Fragment>
     <IconButton color='inherit' className={classes.mobileOn} title="Правописание, проверка..." onClick={onBurgerClick}>
       <MenuIcon />
     </IconButton>

       <Menu
          id='burger-menu'
          anchorEl={burgerEl}
          onClose={onBurgerClose}
          open={Boolean(burgerEl)}>
          <ToolbarLink to='/spelling' className={classes.menuLink} title='Правописание' onClick={onBurgerClose}>
            <PACIcon  className={classes.icon} fontSize='small' color='inherit' />
            <span >Правописание</span>
          </ToolbarLink>

          <ToolbarLink to='/check' className={classes.menuLink} title='Проверка' onClick={onBurgerClose}>
            <ListAltIcon  className={classes.icon} fontSize='small' color='inherit' />
            <span>Проверка</span>
          </ToolbarLink>
        </Menu>
    </Fragment>
);

const BormoToolbar = ({classes, theme, burgerEl, onBurgerClick, onBurgerClose})  => (
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

   <div className={classes.mobileOff}>
     <ToolbarLink to='/spelling' className={classes.menuLink} title='Правописание'>
      <PACIcon  className={classes.icon} fontSize='small' color='inherit' />
      <span className={classes.text}>Правописание</span>
     </ToolbarLink>

     <ToolbarLink to='/check' className={classes.menuLink} title='Проверка'>
      <ListAltIcon  className={classes.icon} fontSize='small' color='inherit' />
      <span className={classes.text}>Проверка</span>
     </ToolbarLink>
   </div>

   <BurgerContent classes={classes} burgerEl={burgerEl} onBurgerClick={onBurgerClick} onBurgerClose={onBurgerClose}/>

  </nav>
);


export default withStyles(styles)(BormoToolbar);
