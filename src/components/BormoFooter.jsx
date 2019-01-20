import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import BormoThemeSelect from './BormoThemeSelect';

import {getMobileWidthMarker} from '../functions';

import { withStyles, withTheme } from '@material-ui/core/styles';


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
    top: -20,
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

const BormoFooter = ({classes, theme, ...rest}) => {
 const fabSize = theme.breakpoints.down('sm') ? 'small' : 'medium';
 const mobileDepends = getMobileWidthMarker(theme) ?
    <IconButton color='inherit' className={classes.searchButton}>
      <MoreIcon />
    </IconButton> :
    <BormoThemeSelect {...rest}/>;
 return (
	<AppBar position='fixed' color='primary' className={classes.appBar}>
	  <Toolbar className={classes.toolbar}>
      {mobileDepends}
      <div className={classes.fabButtons}>
  	    <Fab color='primary' aria-label='Предыдущий урок' title='Предыдущий урок' className={classes.fabButton} size={fabSize}>
  	      <ArrowBackIcon />
  	    </Fab>
        <Fab color='secondary' aria-label='Старт/перезапуск' title='Старт/перезапуск' className={classes.fabButton} size={fabSize}>
          <RefreshRoundedIcon />
        </Fab>
        <Fab color='primary' aria-label='Следующий урок' title='Cледующий урок' className={classes.fabButton} size={fabSize}>
          <ArrowForwardIcon />
        </Fab>
      </div>
	    <div>
	      <IconButton color='inherit' className={classes.searchButton}>
	        <SearchIcon />
	      </IconButton>
	    </div>
	  </Toolbar>
	 </AppBar>)};


export default withTheme()(withStyles(styles)(BormoFooter));
