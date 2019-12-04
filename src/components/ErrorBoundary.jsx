import React from 'react';
import {Paper, Typography} from '@material-ui/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wasError: false};
  }

  componentDidCatch() {
    this.setState({wasError: true});
  }

  render() {
    if (this.state.wasError) {
      return (
        <Paper>
          <Typography variant='caption' color='primary'>Произошла неизвестная ошибка...</Typography>
        </Paper>
      );
    } else {
      return (this.props.children);
    }
  }
}

export default ErrorBoundary;
