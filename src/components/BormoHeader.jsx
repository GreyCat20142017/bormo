import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import More from '@material-ui/icons/MoreVert';

import BormoToolbar from './BormoToolbar';

const styles = (theme) => ({
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  appName: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }

});

class BormoHeader extends React.Component {
 constructor(props) {
 	super(props);
 	this.state = {
    anchorEl: null,
  };
 }

	onAnchorClick = evt => {
	  this.setState({ anchorEl: evt.currentTarget });
	};

  onConfigClick = () => {
  	this.setState({ anchorEl: null });
    this.props.openConfig();
  };

  onAboutClick = () => {
  	this.setState({ anchorEl: null });
    this.props.openAbout();
  }


	render() {
	  const classes = this.props.classes;
	  const anchorEl = this.state.anchorEl;
		 return (

		      <AppBar position='static' color='primary' className={classes.appbar}>
		        <Toolbar className={classes.toolbar}>
		          <Typography variant='h5' color='inherit' className={classes.appName}>
		            Бормо<span className={classes.appNamePart}>тунчик</span>
		          </Typography>

			     	   <BormoToolbar/>
			     	   <IconButton color='inherit' onClick={this.onAnchorClick}>
			        	<More />
			     	   </IconButton>
				     	 <Menu
			          id='simple-menu'
			          anchorEl={anchorEl}
			          open={Boolean(anchorEl)}>
				          <MenuItem onClick={this.onConfigClick}>Настройка</MenuItem>
				          <MenuItem onClick={this.onAboutClick}>О программе</MenuItem>
			         </Menu>

		        </Toolbar>
		      </AppBar>

		)
	}
}

export default withStyles(styles, { withTheme: true })(BormoHeader);
