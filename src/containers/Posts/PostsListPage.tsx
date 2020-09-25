import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { CreatePostDialog } from '../../components/dialogs/CreatePostDialog/CreatePostDialog';
import { boundAddPost, boundGetPosts } from '../../store/posts/actions';
import { IPostData } from '../../api/auth';
import { PostsList } from '../../components/posts/PostsList/PostsList';
import { useModalState } from '../../components/hooks/useModalState';
import { FAILURE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from '../../utils/constants/other';
import { useAsyncAction } from '../../components/hooks/useAsyncAction';

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
// const { search } = useLocation();
// const queryParams = new URLSearchParams(search);
const PostsListPage: React.FC = (): JSX.Element => {
  const {
    isOpened: isCreatingPostModalOpened,
    handleOpen: handleOpenPostCreation,
    handleClose: handleClosePostCreation,
  } = useModalState();

  const classes = useStyles();
  const { loading: addPostLoading, execute: savePost } = useAsyncAction(boundAddPost);
  const { loading: fetchPostsLoading, execute: fetchPosts } = useAsyncAction(boundGetPosts);
  const { posts } = useSelector((store: any) => store.posts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
        loading={addPostLoading}
      />

      <Grid item container xs={12} alignItems="center" justify="center">
        <PostsList loading={fetchPostsLoading} posts={posts} className={classes.posts} />
      </Grid>
    </Grid>
  );
};

export default PostsListPage;
