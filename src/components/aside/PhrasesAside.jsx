import React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import BormoLessons from './BormoLessons';
import {withStyles} from '@material-ui/core';

const styles = theme => ({
  title: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
});

const PhrasesAside = ({classes, title, lastLesson, lessons, currentLesson, onLessonChange}) => (
  <div>
    <Typography className={classes.title} variant='h6'>{title}</Typography>
    <div className={classes.asideWrapperLesson}>
      <BormoLessons
        key={'lessons'}
        lessons={lessons}
        currentLesson={currentLesson}
        lastLesson={lastLesson}
        onLessonChange={onLessonChange}/>
    </div>
    <Divider/>
  </div>
);

export default withStyles(styles)(PhrasesAside);
