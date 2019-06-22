import React, {Fragment} from 'react';

import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import HeadsetIcon from '@material-ui/icons/Headset';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PACIcon from '@material-ui/icons/PlaylistAddCheck';
import MenuIcon from '@material-ui/icons/Menu';

import {withStyles} from '@material-ui/core/styles';

import ToolbarLink from './ToolbarLink';
import {SERVER_ROOT} from "../constants";


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
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex'
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
        theme.palette.primary.main + ' 50%, ' +
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


const SwitchableContent = ({classes, burgerEl, onBurgerClick, onBurgerClose}) => (
  <Fragment>

    <ToolbarLink to={SERVER_ROOT + 'bormotun'} className={classes.menuLink} title='Бормотание' onClick={onBurgerClose}>
      <HeadsetIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Бормотание</span>
    </ToolbarLink>

    <ToolbarLink to={SERVER_ROOT + 'control'} className={classes.menuLink} title='Контроль' onClick={onBurgerClose}>
      <DoneIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Контроль</span>
    </ToolbarLink>

    <ToolbarLink to={SERVER_ROOT + 'reversecontrol'} className={classes.menuLink} title='Контроль наоборот' onClick={onBurgerClose}>
      <DoneAllIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Контроль наоборот</span>
    </ToolbarLink>

    <ToolbarLink to={SERVER_ROOT + 'spelling'} className={classes.menuLink} title='Правописание' onClick={onBurgerClose}>
      <PACIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Правописание</span>
    </ToolbarLink>

    <ToolbarLink to={SERVER_ROOT + 'check'} className={classes.menuLink} title='Проверка' onClick={onBurgerClose}>
      <ListAltIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Проверка</span>
    </ToolbarLink>
  </Fragment>
);


const BurgerContent = (props) => (
  <Fragment>
    <IconButton color='inherit' className={props.classes.mobileOn} title="Пункты главного меню..."
                onClick={props.onBurgerClick}>
      <MenuIcon/>
    </IconButton>

    <Menu
      id='burger-menu'
      anchorEl={props.burgerEl}
      onClose={props.onBurgerClose}
      open={Boolean(props.burgerEl)}>
      <SwitchableContent {...props} />
    </Menu>
  </Fragment>
);

const BormoToolbar = ({classes, theme, burgerEl, onBurgerClick, onBurgerClose}) => {
  const props = {classes, theme, burgerEl, onBurgerClick, onBurgerClose};
  return (<nav className={classes.menuList}>
    <ToolbarLink exact to={SERVER_ROOT} className={classes.menuLink} title='Главная'>
      <HomeIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Главная</span>
    </ToolbarLink>

    <div className={classes.mobileOff}>
      <SwitchableContent {...props} />
    </div>

    <BurgerContent {...props}/>

  </nav>)
};


export default withStyles(styles)(BormoToolbar);
