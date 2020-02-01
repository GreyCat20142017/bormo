import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppIcon from '@material-ui/icons/Apps';

import {withStyles} from '@material-ui/core/styles'

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
      <AppIcon/>
    </Hidden>
  </div>
);

export default  withStyles(styles)(ContentMissingMessage);
