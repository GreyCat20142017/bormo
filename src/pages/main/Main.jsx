import React from 'react';
import {Avatar, Typography, Card, CardHeader, CardContent, withStyles} from '@material-ui/core';
import {Headset} from '@material-ui/icons';

import {styles} from './Main.css.js';

const Main = ({classes}) => (
  <div className={classes.mainWrapper}>

    <Card className={classes.card}>
      <CardHeader title='Браузерная версия программы - зубрилки' avatar={
        <Avatar aria-label='Recipe' className={classes.avatar} color='primary'>
          <Headset fontSize='default' color='inherit'/>
        </Avatar>}
      />

      <CardContent>
        <Typography variant='h5'>
          Бормотунчик - 2019
        </Typography>
        <Typography variant='caption'>
          <p>React, React Router, Material-UI</p>
          <p>Рекомендуемый браузер - Google Chrome</p>
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default withStyles(styles)(Main);
