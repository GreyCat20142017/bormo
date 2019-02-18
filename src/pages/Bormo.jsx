import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  cardList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: '2.2%',
    paddingRight: '2.2%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }

  },
  cardItem: {
    minWidth: '47%',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      margin: '4px',
      minWidth: '90%'
    }
  },
  card: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      padding: '2px',
      marginTop: '0'
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  }

});

const WordList = ({content, classes}) => (
  <ul className={classes.cardList}>
    {content.map((item, ind) =>
      <li className={classes.cardItem} key={ind}>
        <Paper className={classes.card}>

          <Typography className={classes.title} variant='h6' color='textSecondary'>
            {item.english}
          </Typography>

        </Paper>
      </li>
    )
    }
  </ul>
);

class Bormo extends Component {
  render() {
    let {content, classes} = this.props;
    return (
      <div className='bormo__wrapper'>
        <WordList content={content} classes={classes}/>
      </div>
    );
  }
}

export default withStyles(styles)(Bormo);
