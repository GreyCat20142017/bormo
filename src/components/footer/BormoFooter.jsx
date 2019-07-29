import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import BormoThemeSelect from '../BormoThemeSelect';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './BormoFooter.css.js';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../routes';

const BormoFooter = ({classes, theme, onNextClick, onPreviousClick, ...rest}) => (
  <AppBar position='fixed' color='primary' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>

      <IconButton color='inherit' className={classes.mobileOn}>
        <MoreIcon/>
      </IconButton>
      <BormoThemeSelect {...rest} className={classes.mobileOff}/>

      <div className={classes.fabButtons}>
        <Fab color='secondary' aria-label='Предыдущий урок' title='Предыдущий урок (Alt+P) - Previous'
             className={classes.fabButton}
             size='small' onClick={onPreviousClick}>
          <ArrowBackIcon/>
        </Fab>
        <Fab color='primary' aria-label='Справка'
             title='Подробная справка.  Коротко -  Следующий режим: (Alt+X) - neXt, Рестарт: (Alt+R) - Restart'
             className={classes.fabButton}
             size='small'>
          <HelpOutlineIcon/>
        </Fab>
        <Fab color='secondary' aria-label='Следующий урок' title='Cледующий урок (ALt+N) - Next'
             className={classes.fabButton}
             size='small' onClick={onNextClick}>
          <ArrowForwardIcon/>
        </Fab>
      </div>
      <div>
        <NavLink className={classes.searchButton} to={ROUTES.SEARCH}
                 title='Поиск слова в базе и в данных, полученных через API SkyEng'>
          <SearchIcon/>
        </NavLink>
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(BormoFooter);
