import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import HeadsetIcon from '@material-ui/icons/Headset';

import {withStyles} from '@material-ui/core/styles';

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
          Бормотунчик - 2018
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
