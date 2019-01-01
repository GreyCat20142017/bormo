import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

class BormoConfig extends React.Component {
  render() {
   const isConfigOpen = this.props.isConfigOpen;
   if (isConfigOpen) {
      return (
        <Dialog
          fullScreen
          open={isConfigOpen}
        >
        <Button variant="contained" color="primary" onClick={this.props.closeConfig}>
          Закрыть
        </Button>
        </Dialog>)
   } else {
    return null
   }
 }
}

export default BormoConfig;



