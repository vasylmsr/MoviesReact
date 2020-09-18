import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { CreatePostDialog } from '../../components/dialogs/CreatePostDialog/CreatePostDialog';
import { addPost, getPosts } from '../../store/posts/actions';
import { IPostData } from '../../api/auth';
import { PostsList } from '../../components/posts/PostsList/PostsList';
import { useModalState } from '../../components/hooks/useModalState';
import { FAILURE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from '../../utils/constants/other';

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
  posts: {
    marginTop: theme.spacing(3),
  },
}));

export const PostsListPage: React.FC = (): JSX.Element => {
  const {
    isOpened: isCreatingPostModalOpened,
    handleOpen: handleOpenCreationPost,
    handleClose: handleCloseCreationPost,
  } = useModalState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // const { search } = useLocation();
  // const queryParams = new URLSearchParams(search);

  const savePost = (data: IPostData) => dispatch(addPost(data));

  const { posts, addPostError, addPostStatus } = useSelector((store: any) => store.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (addPostStatus === FAILURE_STATUS) {
      enqueueSnackbar(addPostError.message, { variant: 'error' });
    } else if (addPostStatus === SUCCESS_STATUS) {
      handleCloseCreationPost();
    }
  }, [handleCloseCreationPost, addPostStatus, enqueueSnackbar, addPostError]);

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
        loading={addPostStatus === LOADING_STATUS}
      />

      <PostsList posts={posts} className={classes.posts} />
    </div>
  );
};
