import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';


const styles = theme => ({
  btn: {
    textAlign: 'center',
    flexShrink: 1,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    [theme.breakpoints.down('lg')]: {
      margin: '4px',
      padding: '2px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '20px'
    }
  }
});

class BormoLesson extends React.Component {

  onLessonClick = () => this.props.onLessonChange(this.props.item);

  render() {
    const {currentLesson, item, classes} = this.props;
    return (
      <Fab
        color={item === currentLesson ? 'primary' : 'secondary'}
        title={'Урок ' + item}
        onClick={this.onLessonClick}
        className={classes.btn}
        size='small'>
        {item}
      </Fab>
    )
  }
}

export default withStyles(styles)(BormoLesson);

