import React from 'react';

import {withStyles} from '@material-ui/core/styles/index';

import Menu from '@material-ui/core/Menu/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import Typography from '@material-ui/core/Typography/index';
import IconButton from '@material-ui/core/IconButton/index';
import MoreIcon from '@material-ui/icons/MoreVert';

import BormoToolbar from '../BormoToolbar';
import {styles} from './BormoHeader.css.js';

class BormoHeader extends React.Component {
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
  }


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
            id='simple-menu'
            anchorEl={anchorEl}
            onClose={this.onMenuClose}
            open={Boolean(anchorEl)}>
            {/* <NavLink to='/config' onClick={this.onConfigClick} title='Основные параметры программы'>Настройка</NavLink> */}
            <MenuItem onClick={this.onConfigClick} title='Основные параметры программы'>Настройка</MenuItem>
            <MenuItem onClick={this.onModalClick} title='Коротко об основных режимах'>О программе</MenuItem>
          </Menu>
      </div>


    )
  }
}

export default withStyles(styles)(BormoHeader);
