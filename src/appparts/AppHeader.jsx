import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppIcon from '@material-ui/icons/Apps';

import BormoHeader from '../components/header/BormoHeader';

export const AppHeader = ({
                            classes, currentTheme, themes, currentRoute,
                            onDrawerToggle, openModal, closeModal, openConfig, closeConfig, onThemeSelect
                          }) => (
  <AppBar position='fixed' className={classes.appBar}>
    <Toolbar>
      <IconButton
        color='secondary'
        aria-label='Открыть панель'
        onClick={onDrawerToggle}
        className={classes.menuButton}
        title='Открыть панель выбора курса и уроков'>
        <AppIcon/>
      </IconButton>
      <BormoHeader
        currentRoute={currentRoute}
        theme={currentTheme}
        openModal={openModal}
        closeModal={closeModal}
        openConfig={openConfig}
        closeConfig={closeConfig}
        onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}/>
    </Toolbar>
  </AppBar>
);
