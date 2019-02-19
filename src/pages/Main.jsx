import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import {withStyles} from '@material-ui/core/styles';

import HeadsetIcon from '@material-ui/icons/Headset';

const styles = theme => ({
  mainWrapper: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: '1%',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '200px'
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '400px'
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
});


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
