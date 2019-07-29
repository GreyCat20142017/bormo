import React from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import {ROUTES, SWITCHABLE_ROUTES} from '../../routes';

const styles = theme => ({
  btn: {
    textAlign: 'center',
    flexShrink: 1,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  }
});

class BormoLesson extends React.Component {

  onLessonClick = () => {
    if ((this.props.location.pathname !== ROUTES.PHRASES) && (SWITCHABLE_ROUTES.indexOf(this.props.location.pathname) !== -1)) {
      this.props.history.push(ROUTES.BORMO);
    }
    this.props.onLessonChange(this.props.item, true);
  };

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

export default withStyles(styles)(withRouter(BormoLesson));
