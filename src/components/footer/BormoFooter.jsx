import React from 'react';

import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import Fab from '@material-ui/core/Fab/index';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import BormoThemeSelect from '../BormoThemeSelect';

import {withStyles} from '@material-ui/core/styles/index';
import {styles} from './BormoFooter.css.js';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../routes";

const BormoFooter = ({classes, theme, onNextClick, onPreviousClick,  ...rest}) => (
  <AppBar position='fixed' color='primary' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>

      <IconButton color='inherit' className={classes.mobileOn}>
        <MoreIcon/>
      </IconButton>
      <BormoThemeSelect {...rest} className={classes.mobileOff}/>

      <div className={classes.fabButtons}>
        <Fab color='secondary' aria-label='Предыдущий урок' title='Предыдущий урок' className={classes.fabButton}
             size='small' onClick={onPreviousClick}>
          <ArrowBackIcon/>
        </Fab>
        <Fab color='primary' aria-label='Справка' title='Справка' className={classes.fabButton}
             size='small'>
          <HelpOutlineIcon/>
        </Fab>
        <Fab color='secondary' aria-label='Следующий урок' title='Cледующий урок' className={classes.fabButton}
             size='small' onClick={onNextClick}>
          <ArrowForwardIcon/>
        </Fab>
      </div>
      <div>
        <NavLink  className={classes.searchButton} to={ROUTES.SEARCH} title='Основные параметры программы'>
          <SearchIcon/>
        </NavLink>

      </div>
    </Toolbar>
  </AppBar>);


export default withStyles(styles)(BormoFooter);
