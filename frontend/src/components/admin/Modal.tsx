import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomButton = styled(Button)(() => ({
  textTransform: 'none', // không viết hoa chữ cái
  backgroundColor: '#1d4ed8', // tương đương với bg-blue-700
  '&:hover': {
    backgroundColor: '#1e40af', // tương đương với hover:bg-blue-800
  },
  '&:focus': {
    outline: '4px solid #93c5fd', // tương đương với focus:ring-4 focus:ring-blue-300
  },
}));

type TransitionsModalProps = {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  useCustom: boolean;
};
export default function TransitionsModal({
  content,
  title,
  icon,
  useCustom,
}: TransitionsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {useCustom ? (
        <CustomButton variant="contained" onClick={handleOpen} startIcon={icon}>
          {title}
        </CustomButton>
      ) : (
        <IconButton
          aria-label="delete"
          onClick={handleOpen}
          sx={{ padding: 0 }}
        >
          {icon}
        </IconButton>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{content}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
