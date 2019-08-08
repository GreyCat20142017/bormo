import React from 'react';
import {NavLink} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/core/styles';

import {ROUTES} from '../../routes';
import BormoThemeSelect from '../BormoThemeSelect';
import DataSourceSelector from '../DataSourceSelector';
import {styles} from './BormoFooter.css.js';

const BormoFooter = ({classes, theme, onNextClick, onPreviousClick, onSelectDataSource, ...rest}) => (
  <AppBar position='fixed' color='primary' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <DataSourceSelector onSelectDataSource={onSelectDataSource}/>
      <IconButton className={classes.hidden} color='inherit'><MoreIcon/></IconButton>
      <Hidden mdDown implementation='css'>
        <BormoThemeSelect {...rest} light={true}/>
      </Hidden>
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
