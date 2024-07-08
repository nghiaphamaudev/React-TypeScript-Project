import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useSnackbar } from 'src/components/client/snackbar/Snackbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import pink from '@mui/material/colors/pink';
import { IconButton } from '@mui/material';
type AlertDialogProps = {
  id: string;
  reloadProduct: () => void;
};

export default function DeleteDialog({ id, reloadProduct }: AlertDialogProps) {
  const { showSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/laptops/${id}`);
      showSnackbar('success', 'Delete product is successfully!');
      reloadProduct();
    } catch (error) {
      showSnackbar('error', 'Delete is failed!');
    } finally {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="delete"
        onClick={handleClickOpen}
        sx={{ padding: 0 }}
      >
        <DeleteForeverIcon sx={{ color: pink[700] }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Product'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? Please consider before agreeing!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
