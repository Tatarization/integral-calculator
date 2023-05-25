import React, {FC} from 'react';
import {Box, Modal, Typography} from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
export interface BaseModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  handleClose?: () => void;
}

export const BaseModal: FC<BaseModalProps> = ({title, content, isOpen, handleClose}) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
          {content}
        </Typography>
      </Box>
    </Modal>
  );
};
