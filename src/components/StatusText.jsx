import React from 'react';
import {Typography, Hidden} from '@material-ui/core';

const StatusText = ({classes, statusText}) => (
  <Typography variant='caption' color='inherit' className={classes.status}>
    <span className={classes.underlined}>{statusText.mode}</span>&nbsp;<Hidden smDown><span>{statusText.details}</span></Hidden>
  </Typography>
);

export default StatusText;
