import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import BormoCourse from './BormoCourse';
import BormoLesson from './BormoLesson';

const styles = theme => ({
  aside: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },

  asideWrapper: {
    position: 'relative',
    maxHeight: '50%'
  },

  lessonList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '10px',
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '2px',
      justifyContent: 'center'
    },
 }

});

const Courses = ({ courses,  currentCourse, onCourseChange, classes }) => (
  <List dense={true}>
    {courses.map((item, index) => (
    <BormoCourse key={item.name} title={item.name} item={item} currentCourse={currentCourse} onCourseChange={onCourseChange}/>
  )) }
  </List>
);

const Lessons = ({ lessons,  currentLesson, onLessonChange, classes }) => (
  <ul className={classes.lessonList}>
    {lessons.map((item, index) => (
      <li key={index}>
        <BormoLesson item={item} currentLesson={currentLesson} onLessonChange={onLessonChange}/>
      </li>
  )) }
  </ul>
);


class BormoAside extends React.Component {
  static Courses = Courses;
  static Lessons = Lessons;

   render() {
    const { classes,
      courses, currentCourse,  onCourseChange,
      lessons, currentLesson,  onLessonChange } = this.props;
    return (
     <nav className={classes.aside}>
      <div className={classes.asideWrapper}>
       <Courses key={'courses'} courses={courses} currentCourse={currentCourse} classes={classes} onCourseChange={onCourseChange}/>
      </div>
      <Divider/>
      <div className={classes.asideWrapper}>
       <Lessons key={'lessons'} lessons={lessons} currentLesson={currentLesson} classes={classes} onLessonChange={onLessonChange}/>
      </div>
     </nav>
    )
   }
}

   export default withStyles(styles,  { withTheme: true })(BormoAside);
