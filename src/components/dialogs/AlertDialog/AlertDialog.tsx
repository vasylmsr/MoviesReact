import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
} from '@material-ui/core';
import { UiButton } from 'components/ui';

export type AlertDialogProps = DialogProps & {
  onAgree: any;
  title?: string;
  content?: string;
  loading?: boolean;
  onClose: () => void;
};

export const AlertDialog: React.FC<AlertDialogProps> = props => {
  const { open, onClose, title, content, onAgree, loading } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content || 'You can not cancel it'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <UiButton onClick={onClose} color="primary">
          Disagree
        </UiButton>
        <UiButton onClick={onAgree} color="primary" loading={loading}>
          Agree
        </UiButton>
      </DialogActions>
    </Dialog>
  );
};
