import React from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, IconButton, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import BormoNavigation from './BormoNavigation';
import BormoIcon from '../icon/BormoIcon';
import {menuItems} from './menuItems';
import {styles} from './BormoToolbar.css';

const BurgerContent = (props) => (
  <>
    <IconButton color='inherit' className={props.classes.mobileOn} title="Пункты главного меню..."
                onClick={props.onBurgerClick}>
      <BormoIcon icon={'Menu'}/>
    </IconButton>
    <Menu
      id='burger-menu'
      anchorEl={props.burgerEl}
      onClose={props.onBurgerClose}
      open={Boolean(props.burgerEl)}>
      {menuItems.map((item,ind) =>
      <NavLink key={ind} className={props.classes.navItem} exact to={item['href']} onClick={props.onBurgerClose}>
        <MenuItem title={item['title']}>
          <BormoIcon icon={item['icon']}/>&nbsp;&nbsp;{item['label']}
        </MenuItem>
      </NavLink>
        )}
    </Menu>
  </>
);

const BormoToolbar = ({classes, ...rest}) => (
  <nav className={classes.menuList}>
    <div className={classes.mobileOff}>
      <BormoNavigation classes={classes} {...rest}/>
    </div>
    <BurgerContent classes={classes} {...rest}/>
  </nav>);

export default withStyles(styles)(BormoToolbar);
