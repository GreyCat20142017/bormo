import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

import { withStyles } from '@material-ui/core/styles';

const Transition = (props) => (<Slide direction="left" {...props} />);

const styles = theme => ({
  modal: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '200px'
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '400px'
    }
  }
});

const BormoSimpleModal = ({classes, isModalOpen, title, text, closeModal}) => {
   if (isModalOpen) {
      return (
        <Dialog className={classes.modal}
          open={isModalOpen}
          TransitionComponent={Transition}
        >
        <DialogTitle>{title}</DialogTitle>
        <DialogContentText>{text}</DialogContentText>
        <Button variant="contained" color="primary" onClick={closeModal}>
          Закрыть
        </Button>
        </Dialog>)
   } else {
    return null
   }
 }


export default  withStyles(styles)(BormoSimpleModal);



