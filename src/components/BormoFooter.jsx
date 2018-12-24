import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import Menu from '@material-ui/icons/Menu';
import RefreshRounded from '@material-ui/icons/RefreshRounded';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({ 
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButtons: {
    position: 'relative',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: 'auto'
  },
  fabButton: {
    position: 'relative',
    margin: '0 2px'
  }  
});

const BormoFooter = ({classes}) => (

	<AppBar position="fixed" color="primary" className={classes.appBar}>
	  <Toolbar className={classes.toolbar}>
	    <IconButton color="inherit" aria-label="Open drawer">
	      <Menu />
	    </IconButton>
      <div className={classes.fabButtons}>
  	    <Fab color="primary" aria-label="Предыдущий урок" title="Предыдущий урок" className={classes.fabButton}>
  	      <ArrowBack />
  	    </Fab>
        <Fab color="secondary" aria-label="Перезапустить" title="Перезапустить" className={classes.fabButton}>
          <RefreshRounded />
        </Fab>
        <Fab color="primary" aria-label="Следующий урок" title="Cледующий урок" className={classes.fabButton}>
          <ArrowForward />
        </Fab>
      </div>
	    <div>
	      <IconButton color="inherit">
	        <Search />
	      </IconButton>	     
	    </div>
	  </Toolbar>
	 </AppBar>);

export default withStyles(styles)(BormoFooter);