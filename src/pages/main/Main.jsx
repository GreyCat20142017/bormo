import React from 'react';

import {Avatar, Card, CardContent, CardHeader, Typography, withStyles} from '@material-ui/core';
import HeadsetIcon from '@material-ui/icons/Headset';

import {styles} from './Main.css.js';

const Main = ({classes}) => (
  <div className={classes.mainWrapper}>

    <Card className={classes.card}>
      <CardHeader title='Браузерная версия программы - зубрилки' avatar={
        <Avatar aria-label='Recipe' className={classes.avatar} color='primary'>
          <HeadsetIcon fontSize='default' color='inherit'/>
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

        <Typography variant='caption' color={'primary'}>
          <p>Но уже очевидно, что бормотунчику требуется полная переделка. И она неспешно ведется...</p>
        </Typography>
      </CardContent>
    </Card>
  </div>
);


export default withStyles(styles)(Main);
