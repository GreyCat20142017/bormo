import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import {withStyles} from '@material-ui/core/styles';

import BormoCourse from './BormoCourse';
import BormoLessons from './BormoLessons';

const styles = theme => ({});

const Courses = ({courses, currentCourse, onCourseChange}) => (
  <List dense={true}>
    {courses.map((item, index) => (
      <BormoCourse key={item.name + ' ' + item.index} title={item.name} item={item} ind={index}
                   currentCourse={currentCourse} onCourseChange={onCourseChange}/>
    ))}
  </List>
);

const BormoAside = ({classes, courses, currentCourse, lastLesson, onCourseChange, lessons, currentLesson, onLessonChange}) => (
  <div>
    <Divider/>
    <div className={classes.toolbar}/>
    <div className={classes.asideWrapperCourse}>
      <Courses key={'courses'} courses={courses} currentCourse={currentCourse} classes={classes}
               onCourseChange={onCourseChange}/>
    </div>
    <Divider/>
    <div className={classes.asideWrapperLesson}>
      <BormoLessons
        key={'lessons'}
        lessons={lessons}
        currentLesson={currentLesson}
        lastLesson={lastLesson}
        onLessonChange={onLessonChange}/>
    </div>
  </div>
);

export default withStyles(styles)(BormoAside);
