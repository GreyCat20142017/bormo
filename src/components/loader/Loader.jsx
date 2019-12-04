import React from 'react';
import {Typography, CircularProgress, withStyles} from '@material-ui/core';

import {styles} from './Loader.css';

const Loader = ({classes, text = 'Данные загружаются...'}) => (
  <div className={classes.loaderWrapper}>
    <Typography className={classes.text} variant='caption' color='primary'>{text}</Typography>
    <CircularProgress className={classes.progress} variant='indeterminate' color='primary'/>
  </div>
);

export default withStyles(styles)(Loader);
