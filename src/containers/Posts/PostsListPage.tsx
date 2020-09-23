import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { CreatePostDialog } from '../../components/dialogs/CreatePostDialog/CreatePostDialog';
import { addPost, getPosts } from '../../store/posts/actions';
import { IPostData } from '../../api/auth';
import { PostsList } from '../../components/posts/PostsList/PostsList';
import { useModalState } from '../../components/hooks/useModalState';
import { FAILURE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from '../../utils/constants/other';

const useStyles = makeStyles(theme => ({
  header: {
    color: 'black',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
  },
  modalBody: {
    width: '200px',
  },
  posts: {
    marginTop: theme.spacing(3),
  },
  root: {
    justifyContent: 'center',
  },
  createPostBtn: {
    width: '100%',
  },
}));

const PostsListPage: React.FC = (): JSX.Element => {
  const {
    isOpened: isCreatingPostModalOpened,
    handleOpen: handleOpenPostCreation,
    handleClose: handleClosePostCreation,
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
      handleClosePostCreation();
    }
  }, [handleClosePostCreation, addPostStatus, enqueueSnackbar, addPostError]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.header}>
          My Posts
        </Typography>
      </Grid>
      <Grid item md={3} sm={4} xs={12}>
        <Button
          className={classes.createPostBtn}
          variant="outlined"
          onClick={handleOpenPostCreation}
        >
          Create a Post
        </Button>
      </Grid>

      <CreatePostDialog
        title="Create a Post"
        onSave={savePost}
        onClose={handleClosePostCreation}
        open={isCreatingPostModalOpened}
        loading={addPostStatus === LOADING_STATUS}
      />

      <PostsList posts={posts} className={classes.posts} />
    </Grid>
  );
};

export default PostsListPage;
