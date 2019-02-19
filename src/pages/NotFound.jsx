import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';


const styles = theme => ({
  page404: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  page404__header: {
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {needRedirect: false};
  }

  setRedirect = () => {
    this.setState({needRedirect: true});
  }

  render() {
    const {classes} = this.props;
    const needRedirect = this.state.needRedirect;
    if (needRedirect) {
      return (
        <Route render={() => (<Redirect to='/'/>)}/>
      )
    }
    return (
      <section className={classes.page404}>
        <h5 className={classes.page404__title}>Укaзанная ссылка не найдена</h5>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={this.setRedirect}>
          {'Перейти на главную'}
          <ReportIcon className={classNames(classes.rightIcon, classes.iconSmall)}/>
        </Button>
      </section>)
  }

}

export default withStyles(styles)(NotFound);
