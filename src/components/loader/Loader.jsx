import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {styles} from './Loader.css';

const Loader = ({classes, text = 'Данные загружаются...'}) => (
  <div className={classes.loaderWrapper}>
    <Typography className={classes.text} variant='caption' color='primary'>{text}</Typography>
    <CircularProgress  className={classes.progress} variant='indeterminate' color='primary'/>
  </div>
);

export default withStyles(styles)(Loader);
