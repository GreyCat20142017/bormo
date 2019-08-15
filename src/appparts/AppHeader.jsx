import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppIcon from '@material-ui/core/SvgIcon';

import BormoHeader from '../components/header/BormoHeader';

export const AppHeader = ({
                            classes, currentTheme, themes,
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
        theme={currentTheme}
        openModal={openModal}
        closeModal={closeModal}
        openConfig={openConfig}
        closeConfig={closeConfig}
        onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}/>
    </Toolbar>
  </AppBar>
);
