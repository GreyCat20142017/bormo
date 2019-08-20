import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const StatusText = ({classes, statusText}) => (
  <Typography variant='caption' color='secondary' className={classes.status}>
    <span className={classes.underlined}>{statusText.mode}</span>&nbsp;<Hidden smDown><span>{statusText.details}</span></Hidden>
  </Typography>
);

export default StatusText;
