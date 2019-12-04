import React from 'react';
import {Menu, IconButton, withStyles} from '@material-ui/core';
import {Home, Headset, Done, DoneAll, ListAlt, PlaylistAddCheck as PAC, Menu as MenuIcon} from '@material-ui/icons';

import ToolbarLink from '../ToolbarLink';
import {ROUTES} from '../../routes';
import {styles} from './BormoToolbar.css';

const SwitchableContent = ({classes, burgerEl, onBurgerClick, onBurgerClose}) => (
  <>

    <ToolbarLink to={ROUTES.BORMO} className={classes.menuLink} title='Бормотание (Alt-M) - Mumble'
                 onClick={onBurgerClose}>
      <Headset className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Бормотание</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.CONTROL} className={classes.menuLink} title='Контроль (Alt-C) - Control'
                 onClick={onBurgerClose}>
      <Done className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Контроль</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.REVERSE} className={classes.menuLink} title='Контроль наоборот (Alt-I) - Inverse control'
                 onClick={onBurgerClose}>
      <DoneAll className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Контроль наоборот</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.SPELLING} className={classes.menuLink} title='Правописание (Alt-O) - Orthography'
                 onClick={onBurgerClose}>
      <PAC className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Правописание</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.CHECK} className={classes.menuLink} title='Проверка (Alt-V) - Validation'
                 onClick={onBurgerClose}>
      <ListAlt className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Проверка</span>
    </ToolbarLink>
  </>
);

const BurgerContent = (props) => (
  <>
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
  </>
);

const BormoToolbar = ({classes, ...rest}) => (
  <nav className={classes.menuList}>
    <ToolbarLink exact to={ROUTES.MAIN} className={classes.menuLink} title='Главная'>
      <Home className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Главная</span>
    </ToolbarLink>

    <div className={classes.mobileOff}>
      <SwitchableContent classes={classes} {...rest}/>
    </div>

    <BurgerContent classes={classes} {...rest}/>
  </nav>);


export default withStyles(styles)(BormoToolbar);
