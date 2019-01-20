import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { wasError: false };
	}

  componentDidCatch () {
    this.setState({ wasError: true });
  }

  render () {
  	if (this.state.wasError) {
  		return (
        <Paper>
  			 <Typography variant='caption' color='primary'>Произошла неизвестная ошибка...</Typography>
         </Paper>
  			)
  	} else {
  		return (this.props.children)
  	}
  }

}

export default ErrorBoundary
