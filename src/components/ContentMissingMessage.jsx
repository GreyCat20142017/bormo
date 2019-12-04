import React from 'react';
import {Typography, Hidden, withStyles} from '@material-ui/core';
import {Apps} from '@material-ui/icons';

const styles = theme => ({
  wrapper: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  }
});

const ContentMissingMessage = ({classes}) => (
  <div className={classes.wrapper}>
    <Typography variant='body2' component='p'>Необходимо выбрать курс и урок...</Typography>
    <Hidden smUp implementation='css'>
      <Typography variant='caption' component='p'>Для открытия панели выбора используется этот пункт
        меню:</Typography>
      <Apps/>
    </Hidden>
  </div>
);

export default  withStyles(styles)(ContentMissingMessage);
