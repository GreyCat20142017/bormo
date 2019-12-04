import React from 'react';
import {Hidden, Drawer, IconButton, Divider} from '@material-ui/core';
import OffIcon from '@material-ui/icons/HighlightOff';

import ErrorBoundary from '../components/ErrorBoundary';
import BormoAside from '../components/aside/BormoAside';

export const AppDrawer = ({
                            classes, currentMode, currentCourse, currentLesson, lessons, courses, lastLesson,
                            mobileOpen, onDrawerToggle, onDebouncedLessonChange, onCourseChange
                          }) => {
  const drawer = (
    <ErrorBoundary>
      <BormoAside
        currentMode={currentMode}
        currentCourse={currentCourse}
        currentLesson={currentLesson}
        lessons={lessons}
        courses={courses}
        onLessonChange={onDebouncedLessonChange}
        onCourseChange={onCourseChange}
        lastLesson={lastLesson}/>
    </ErrorBoundary>
  );

  return (
    <nav className={classes.drawer}>

      <Hidden smUp>
        <Drawer
          variant='temporary'
          anchor={'left'}
          open={mobileOpen}
          onClose={onDrawerToggle}
          classes={{paper: classes.drawerPaper}}>
          <>
            <IconButton
              color='secondary'
              aria-label='Закрыть панель'
              onClick={onDrawerToggle}
              className={classes.menuButton}
              title='Закрыть панель выбора курса и уроков без выбора'>
              <OffIcon/>
            </IconButton>
            <Divider/>
            {drawer}
          </>
        </Drawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer
          classes={{paper: classes.drawerPaper}}
          variant='permanent'
          open>
          {drawer}
        </Drawer>
      </Hidden>

    </nav>
  );
};
