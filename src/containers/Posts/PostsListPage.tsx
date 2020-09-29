import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { CreatePostDialog } from '../../components/dialogs/CreatePostDialog/CreatePostDialog';
import { boundAddPost, boundGetPosts, boundRemovePost } from '../../store/posts/actions';
import { PostsList } from '../../components/posts/PostsList/PostsList';
import { useModalState } from '../../components/hooks/useModalState';
import { useAsyncAction } from '../../components/hooks/useAsyncAction';
import RemovePostDialog from '../../components/posts/RemovePostDialog/RemovePostDialog';

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
  const classes = useStyles();

  const {
    isOpened: isCreatingPostModalOpened,
    handleOpen: handleOpenPostCreation,
    handleClose: handleClosePostCreation,
  } = useModalState();

  const {
    isOpened: isRemovingPostModalOpened,
    handleOpen: openRemovingPostModal,
    handleClose: closeRemovingPostModal,
  } = useModalState();

  const removePostCallback = useCallback(async postId => {
    await boundRemovePost(postId);
    setPostForRemoving(null);
  }, []);

  const [postForRemoving, setPostForRemoving] = useState(null);

  const { loading: addPostLoading, execute: savePost } = useAsyncAction(boundAddPost);
  const { loading: fetchPostsLoading, execute: fetchPosts } = useAsyncAction(boundGetPosts);
  const { loading: removePostLoading, execute: removePost } = useAsyncAction(removePostCallback);

  const { posts } = useSelector((store: any) => store.posts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (postForRemoving) {
      openRemovingPostModal();
    } else {
      closeRemovingPostModal();
    }
  }, [postForRemoving, closeRemovingPostModal, openRemovingPostModal]);

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

      <RemovePostDialog
        open={isRemovingPostModalOpened}
        onAgree={removePost}
        loading={removePostLoading}
        onClose={() => setPostForRemoving(null)}
        post={postForRemoving}
      />

      <CreatePostDialog
        title="Create a Post"
        onSave={savePost}
        onClose={handleClosePostCreation}
        open={isCreatingPostModalOpened}
        loading={addPostLoading}
      />

      <Grid item container xs={12} alignItems="center" justify="center">
        <PostsList
          loading={fetchPostsLoading}
          posts={posts}
          className={classes.posts}
          onRemovePost={setPostForRemoving}
        />
      </Grid>
    </Grid>
  );
};

export default PostsListPage;
