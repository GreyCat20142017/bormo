import React from 'react';
import classNames from 'classnames';

import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const TopPart = ({classes, content, currentCourse, currentLesson, okCount, errorCount, currentTranslate, isHint = false}) => (
  <div className={classes.wrapper}>

    <Badge className={classes.badge} color="primary" badgeContent={currentLesson}
           title={'Курс: ' + currentCourse + ', урок: ' + currentLesson}>
      {currentCourse}
    </Badge>

    <Paper className={classNames(classes.paper, classes.currentPaper, classes.currentWord, isHint ? classes.hint:  '')}>
      <Typography className={classNames(classes.currentWordContent)}
                  component='p' variant='h6' color='inherit' align='center'
                  title={okCount === content.length ? 'Alt+N-ext, Alt+P-revious, Alt+R-estart' : currentTranslate}>
        {okCount === content.length ?
          'Урок "' + currentCourse + ' № ' + currentLesson + '" пройден. Число ошибок: ' + errorCount :
          currentTranslate}
      </Typography>
    </Paper>

    <Badge className={classes.badge} color='primary' badgeContent={errorCount}
           title={'Количество ошибок: ' + errorCount}>
      <ErrorIcon fontSize='large' color='error'/>
    </Badge>

    <Badge className={classes.badge} color='primary' badgeContent={okCount}
           title={'Количество правильно отмеченных: ' + okCount}>
      <CheckCircleIcon fontSize='large' color='disabled'/>
    </Badge>

  </div>
);
