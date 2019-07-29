import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

import BormoToolbar from './BormoToolbar';
import {styles} from './BormoHeader.css.js';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../routes';

class BormoHeader extends Component {
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

    const classes = this.props.classes;
    const {burgerEl, anchorEl} = this.state;
    return (
      <div className={classes.bar}>

        <Typography variant='h5' color='inherit' className={classes.switchable}>
          Бормо<span className={classes.switchablePart}>тунчик</span>
        </Typography>
        <BormoToolbar burgerEl={burgerEl} onBurgerClick={this.onBurgerClick} onBurgerClose={this.onBurgerClose}/>
        <IconButton color='inherit' onClick={this.onAnchorClick}>
          <MoreIcon/>
        </IconButton>
        <Menu
          className={classes.menu}
          id='simple-menu'
          anchorEl={anchorEl}
          onClose={this.onMenuClose}
          open={Boolean(anchorEl)}>
          <Link className={classes.navItem} to={ROUTES.CONFIG} onClick={this.onConfigClick}>
            <MenuItem title='Основные параметры программы'>Настройка</MenuItem>
          </Link>
          <MenuItem onClick={this.onModalClick} title='Коротко об основных режимах'>О программе</MenuItem>
          <Divider/>
          <Link className={classes.navItem} to={ROUTES.PHRASES} onClick={this.onMenuClose}>
            <MenuItem title='Дополнительный режим Фразы'>Фразы</MenuItem>
          </Link>
          <Link className={classes.navItem} to={ROUTES.SKYENG} onClick={this.onMenuClose}>
            <MenuItem title='Поиск в Skyeng с полными результатами'>Поиск Skyeng</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(BormoHeader);
