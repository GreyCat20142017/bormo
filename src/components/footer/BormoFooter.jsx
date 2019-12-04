import React from 'react';
import {NavLink} from 'react-router-dom';
import {AppBar, Toolbar, Hidden, Fab, withStyles} from '@material-ui/core';
import {HelpOutline, ArrowForward, ArrowBack, Search} from '@material-ui/icons';

import BormoThemeSelect from '../BormoThemeSelect';
import DataSourceSelector from '../DataSourceSelector';
import StatusText from '../StatusText';
import {ROUTES} from '../../routes';
import {styles} from './BormoFooter.css';

const BormoFooter = ({
                       classes, theme, onNextClick, onPreviousClick, onSelectDataSource, openModal,
                       currentTheme, ...rest
                     }) => (
  <AppBar position='fixed' color='primary' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <NavLink className={classes.searchButton} to={ROUTES.SEARCH}
               title='Поиск слова в базе и в данных, полученных через API SkyEng'>
        <Search/>
      </NavLink>
      <DataSourceSelector onSelectDataSource={onSelectDataSource}/>

      <Hidden mdDown implementation='css'>
        <BormoThemeSelect currentTheme={currentTheme} {...rest} light={true}/>
      </Hidden>

      <StatusText classes={classes} statusText={rest.statusText}/>

      <div className={classes.fabButtons}>
        <Fab color='secondary' aria-label='Предыдущий урок' title='Предыдущий урок (Alt+P) - Previous'
             className={classes.fabButton}
             size='small' onClick={onPreviousClick}>
          <ArrowBack/>
        </Fab>
        <Fab color='primary' aria-label='Справка'
             title='Подробная справка.  Коротко -  Следующий режим: (Alt+X) - neXt, Рестарт: (Alt+R) - Restart'
             className={classes.fabButton}
             size='small' onClick={openModal}>
          <HelpOutline/>
        </Fab>
        <Fab color='secondary' aria-label='Следующий урок' title='Cледующий урок (ALt+N) - Next'
             className={classes.fabButton}
             size='small' onClick={onNextClick}>
          <ArrowForward/>
        </Fab>
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(BormoFooter);
