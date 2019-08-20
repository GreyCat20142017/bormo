import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
