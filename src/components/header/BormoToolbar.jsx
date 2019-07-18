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

import ToolbarLink from '../ToolbarLink';
import {ROUTES} from '../../routes';
import {styles} from './BormoToolbar.css';

const SwitchableContent = ({classes, burgerEl, onBurgerClick, onBurgerClose}) => (
  <Fragment>

    <ToolbarLink to={ROUTES.BORMO} className={classes.menuLink} title='Бормотание (Alt-M) - Mumble'
                 onClick={onBurgerClose}>
      <HeadsetIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Бормотание</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.CONTROL} className={classes.menuLink} title='Контроль (Alt-C) - Control'
                 onClick={onBurgerClose}>
      <DoneIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Контроль</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.REVERSE} className={classes.menuLink} title='Контроль наоборот (Alt-I) - Inverse control'
                 onClick={onBurgerClose}>
      <DoneAllIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Контроль наоборот</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.SPELLING} className={classes.menuLink} title='Правописание (Alt-O) - Orthography'
                 onClick={onBurgerClose}>
      <PACIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Правописание</span>
    </ToolbarLink>

    <ToolbarLink to={ROUTES.CHECK} className={classes.menuLink} title='Проверка (Alt-V) - Validation'
                 onClick={onBurgerClose}>
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

const BormoToolbar = ({classes, ...rest}) => (
  <nav className={classes.menuList}>
    <ToolbarLink exact to={ROUTES.MAIN} className={classes.menuLink} title='Главная'>
      <HomeIcon className={classes.icon} fontSize='small' color='inherit'/>
      <span className={classes.text}>Главная</span>
    </ToolbarLink>

    <div className={classes.mobileOff}>
      <SwitchableContent classes={classes} {...rest}/>
    </div>

    <BurgerContent classes={classes} {...rest}/>
  </nav>);


export default withStyles(styles)(BormoToolbar);
