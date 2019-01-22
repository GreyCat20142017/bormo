import React from 'react';
// import {NavLink} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

import BormoToolbar from './BormoToolbar';

const styles = (theme) => ({
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  appName: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

});

class BormoHeader extends React.Component {
 constructor(props) {
 	super(props);
 	this.state = {
    anchorEl: null,
    burgerEl: null
  };
 }

  onMenuClose = (evt) => {
    this.setState({ anchorEl: null });
  };

	onAnchorClick = evt => {
	  this.setState({ anchorEl: evt.currentTarget });
	};

  onBurgerClose = (evt) => {
    this.setState({ burgerEl: null });
  };

  onBurgerClick = evt => {
    this.setState({ burgerEl: evt.currentTarget });
  };

  onConfigClick = () => {
  	this.setState({ anchorEl: null });
    this.props.openConfig();
  };

  onModalClick = () => {
  	this.setState({ anchorEl: null });
    this.props.openModal();
  }


  render() {

   const classes = this.props.classes;
   const {burgerEl, anchorEl} = this.state;
   return (

    <AppBar position='static' color='primary' className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' color='inherit' className={classes.appName}>
          Бормо<span className={classes.appNamePart}>тунчик</span>
        </Typography>
        <BormoToolbar burgerEl={burgerEl} onBurgerClick={this.onBurgerClick} onBurgerClose={this.onBurgerClose}/>
        <IconButton color='inherit' onClick={this.onAnchorClick}>
          <MoreIcon />
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

      </Toolbar>
    </AppBar>

    )
 }
}

export default withStyles(styles)(BormoHeader);
