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

import {withStyles} from '@material-ui/core/styles';
import {DRAWER_WIDTH} from "../constants";


const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: `3px solid ${theme.palette.primary.contrastText}`
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
  },
  mobileOn: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  mobileOff: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

const BormoFooter = ({classes, theme, ...rest}) => (
  <AppBar position='fixed' color='primary' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>

      <IconButton color='inherit' className={classes.mobileOn}>
        <MoreIcon/>
      </IconButton>
      <BormoThemeSelect {...rest} className={classes.mobileOff}/>

      <div className={classes.fabButtons}>
        <Fab color='primary' aria-label='Предыдущий урок' title='Предыдущий урок' className={classes.fabButton}
             size='small'>
          <ArrowBackIcon/>
        </Fab>
        <Fab color='secondary' aria-label='Старт/перезапуск' title='Старт/перезапуск' className={classes.fabButton}
             size='small'>
          <RefreshRoundedIcon/>
        </Fab>
        <Fab color='primary' aria-label='Следующий урок' title='Cледующий урок' className={classes.fabButton}
             size='small'>
          <ArrowForwardIcon/>
        </Fab>
      </div>
      <div>
        <IconButton color='inherit' className={classes.searchButton}>
          <SearchIcon/>
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>);


export default withStyles(styles)(BormoFooter);
