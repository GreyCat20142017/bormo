import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


const styles = theme => ({
  btn: {
    margin: '4px',
    maxWidth: '40%',
    padding: theme.spacing.unit/4,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '30px'
    },
  }
});

class BormoLesson extends React.Component {

  onLessonClick = () => this.props.onLessonChange(this.props.item);

  render() {
    const {currentLesson, item, classes} = this.props;
    return (
    <Button
      variant='contained'
      color={item === currentLesson ? 'primary': 'secondary'}
      title={'Урок ' + item}
      onClick={this.onLessonClick}
      className={classes.btn}>
      {item}
    </Button>
     )
  }
}

export default withStyles(styles)(BormoLesson);

