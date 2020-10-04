import React from 'react';
import AlertDialog, { AlertDialogProps } from '../../dialogs/AlertDialog/AlertDialog';
import { IPostData } from '../../../api/auth';

type RemovePostDialogProps = AlertDialogProps & {
  post: IPostData | null;
  title?: string;
};

const RemovePostDialog: React.FC<RemovePostDialogProps> = (
  props: RemovePostDialogProps,
): JSX.Element => {
  const { post, onAgree } = props;
  return (
    <AlertDialog
      {...props}
      onAgree={() => onAgree(post!.id)}
      title="Are you sure want to remove this post?"
    />
  );
};

export default RemovePostDialog;
