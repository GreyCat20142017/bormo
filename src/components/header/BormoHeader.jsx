import React, {PureComponent} from 'react';
import {Menu, MenuItem, Divider, Typography, IconButton, withStyles} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';

import BormoToolbar from './BormoToolbar';
import {styles} from './BormoHeader.css.js';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../routes';

class BormoHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      burgerEl: null
    };
  }

  onMenuClose = (evt) => {
    this.setState({anchorEl: null});
  };

  onAnchorClick = evt => {
    this.setState({anchorEl: evt.currentTarget});
  };

  onBurgerClose = (evt) => {
    this.setState({burgerEl: null});
  };

  onBurgerClick = evt => {
    this.setState({burgerEl: evt.currentTarget});
  };

  onConfigClick = () => {
    this.setState({anchorEl: null});
    this.props.openConfig();
  };

  onModalClick = () => {
    this.setState({anchorEl: null});
    this.props.openModal();
  };

  render() {

    const {classes, currentRoute} = this.props;
    const {burgerEl, anchorEl} = this.state;
    return (
      <div className={classes.bar}>

        <Typography variant='h5' color='inherit' className={classes.switchable}>
          Бормо<span className={classes.switchablePart}>тунчик</span>
        </Typography>
        <BormoToolbar currentRoute={currentRoute} burgerEl={burgerEl} onBurgerClick={this.onBurgerClick} onBurgerClose={this.onBurgerClose}/>
        <IconButton color='inherit' onClick={this.onAnchorClick} title={'Прочие пункты меню'}>
          <MoreVert/>
        </IconButton>
        <Menu
          className={classes.menu}
          id='simple-menu'
          anchorEl={anchorEl}
          onClose={this.onMenuClose}
          open={Boolean(anchorEl)}>
          <NavLink className={classes.navItem} to={ROUTES.CONFIG} onClick={this.onConfigClick}>
            <MenuItem title='Основные параметры программы'>Настройка</MenuItem>
          </NavLink>
          <MenuItem onClick={this.onModalClick} title='Коротко об основных режимах'>О программе</MenuItem>
          <Divider/>
          <NavLink className={classes.navItem} to={ROUTES.SEARCH} onClick={this.onMenuClose}>
            <MenuItem title='Поиск c возможностью добавления данных'>Поиск (БД || Skyeng)</MenuItem>
          </NavLink>
          <NavLink className={classes.navItem} to={ROUTES.SKYENG} onClick={this.onMenuClose}>
            <MenuItem title='Поиск в Skyeng с полными результатами'>Поиск Skyeng</MenuItem>
          </NavLink>
          <Divider/>
          <NavLink className={classes.navItem} to={ROUTES.PHRASES} onClick={this.onMenuClose}>
            <MenuItem title='Дополнительный режим Фразы'>Фразы</MenuItem>
          </NavLink>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(BormoHeader);
