import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';


const styles = theme => ({
  btn: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center'
  }
});

class BormoLesson extends React.Component {

  onLessonClick = () => this.props.onLessonChange(this.props.item);

  render() {
    const {currentLesson, item, classes} = this.props;
    return (
    <Fab
      color={item === currentLesson ? 'primary': 'secondary'}
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

