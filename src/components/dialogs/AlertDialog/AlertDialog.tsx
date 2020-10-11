import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UiButton } from 'components/ui';

export type AlertDialogProps = DialogProps & {
  onAgree: any;
  title?: string;
  content?: string;
  loading?: boolean;
  onClose: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = (props: AlertDialogProps): JSX.Element => {
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

export default AlertDialog;
