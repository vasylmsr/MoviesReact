import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { CreatePostDialog } from '../dialogs/CreatePostDialog/CreatePostDialog';
import { addPost } from '../../store/posts/actions';
import { IPostData } from '../../firebase/AuthApi';

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    textDecoration: 'uppercase',
  },
  modalBody: {
    width: '200px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    alignItems: 'center',
  },
}));

function useModalState(modalVisibility = false) {
  const [isOpened, setOpen] = React.useState(modalVisibility);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return {
    isOpened,
    handleOpen,
    handleClose,
  };
}

export const UserPage: React.FC = (): JSX.Element => {
  const {
    isOpened: isCreatingPostModalOpened,
    handleOpen: handleOpenCreationPost,
    handleClose: handleCloseCreationPost,
  } = useModalState();
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { search } = useLocation();
  // const queryParams = new URLSearchParams(search);

  const savePost = async (data: IPostData) => {
    try {
      await dispatch(addPost(data));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.header}>
        My Posts
      </Typography>

      <Button variant="outlined" color="primary" onClick={handleOpenCreationPost}>
        Create a Post
      </Button>

      <CreatePostDialog
        title="Create a Post"
        onSave={savePost}
        onClose={handleCloseCreationPost}
        open={isCreatingPostModalOpened}
      />
    </div>
  );
};
