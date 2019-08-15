import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Loader = ({classes}) => (
  <Paper className={classes.paperLoader}>
    <Typography variant='caption' color='primary'>Загрузка...</Typography>
  </Paper>
);

export default Loader;
