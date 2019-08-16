import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
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
      <Hidden smUp implementation='css'>

        <Drawer
          variant='temporary'
          anchor={'left'}
          open={mobileOpen}
          onClose={onDrawerToggle}
          classes={{paper: classes.drawerPaper}}>
          <React.Fragment>
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
          </React.Fragment>
        </Drawer>

      </Hidden>
      <Hidden xsDown implementation='css'>
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
