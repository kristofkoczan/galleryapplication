import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Editform from './Editform';



function SimpleDialog(props) {
  const { onClose, open, edit, setEdit } = props;

  const handleClose = () => {
    onClose();
    setEdit(edit+1);
  };


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Edit your datas</DialogTitle>
        <Editform onClose={handleClose} />
        <br />
    </Dialog>
  );
}




SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Edituser(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Button onClick={handleClickOpen}>
        Edit user
      </Button>
      <SimpleDialog open={open} onClose={handleClose} edit={props.edit} setEdit={props.setEdit}/>
    </span>
  );
}
