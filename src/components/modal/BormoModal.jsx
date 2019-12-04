import React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide}  from '@material-ui/core';

const Transition = (props) => {
  return <Slide direction="left" {...props} />;
};

const BormoModal = ({classes, isModalOpen, title, closeModal, innerComponent = null}) => (
  isModalOpen ? <div>
      <Dialog fullWidth={true} maxWidth={'sm'}
              TransitionComponent={Transition}
              open={isModalOpen}
              onClose={closeModal}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent >
          {innerComponent}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant='contained' color='primary' autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div> :
    null
);

export default BormoModal;
