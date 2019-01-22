import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const renderTextFromArray = (text) => text.map(
   (paragraph, ind) => (paragraph === '' ? <br key={ind}/>  : <DialogContentText variant='body2' key={ind}> {paragraph} </DialogContentText>)
);

const BormoModal = ({isModalOpen, title, subtitle, text, closeModal}) => {
   if (isModalOpen) {
    return (
      <div>
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            {Array.isArray(text) ? renderTextFromArray(text): text}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} variant='contained' color='primary' autoFocus>
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  else {
    return (null)
  }
}

export default BormoModal;
