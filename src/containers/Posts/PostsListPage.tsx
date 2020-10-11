import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PostDialog from '../../components/dialogs/PostDialog/PostDialog';
import {
  boundAddPost,
  boundGetPosts,
  boundRemovePost,
  boundEditPost,
} from '../../store/posts/actions';
import { PostsList } from '../../components/posts/PostsList/PostsList';
import { useModalState } from '../../components/hooks/useModalState';
import { useModalWithData } from '../../components/hooks/useModalWithState';
import { useAsyncAction } from '../../components/hooks/useAsyncAction';
import RemovePostDialog from '../../components/posts/RemovePostDialog/RemovePostDialog';
import { IPostData } from '../../api/auth';

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
    isOpened: isEditingPostModalOpened,
    closeModal: closeEditingPostModal,
    data: postForEditing,
    setData: setPostForEditing,
  } = useModalWithData();

  const {
    isOpened: isRemovingPostModalOpened,
    closeModal: closeRemovingPostModal,
    data: postForRemoving,
    setData: setPostForRemoving,
  } = useModalWithData<IPostData>();

  const addPostCallback = async (post: IPostData) => {
    await boundAddPost(post);
    handleClosePostCreation();
  };

  const removePostCallback = useCallback(
    async postId => {
      await boundRemovePost(postId);
      setPostForRemoving(undefined);
    },
    [setPostForRemoving],
  );

  const editPostCallback = useCallback(
    async post => {
      await boundEditPost(post);
      setPostForEditing(undefined);
    },
    [setPostForEditing],
  );

  const { loading: addPostLoading, execute: savePost } = useAsyncAction(addPostCallback);
  const { loading: fetchPostsLoading, execute: fetchPosts } = useAsyncAction(boundGetPosts);
  const { loading: removePostLoading, execute: removePost } = useAsyncAction(removePostCallback);
  const { loading: editPostLoading, execute: editPost } = useAsyncAction(editPostCallback);

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

      <RemovePostDialog
        open={isRemovingPostModalOpened}
        onAgree={removePost}
        loading={removePostLoading}
        onClose={closeRemovingPostModal}
        post={postForRemoving}
      />

      <PostDialog
        title="Create a Post"
        onSave={savePost}
        onClose={handleClosePostCreation}
        open={isCreatingPostModalOpened}
        loading={addPostLoading}
      />

      <PostDialog
        title="Edit a Post"
        onSave={editPost}
        onClose={closeEditingPostModal}
        open={isEditingPostModalOpened}
        loading={editPostLoading}
        post={postForEditing}
      />

      <Grid item container xs={12} alignItems="center" justify="center">
        <PostsList
          loading={fetchPostsLoading}
          posts={posts}
          className={classes.posts}
          onRemovePost={setPostForRemoving}
          onEditPost={setPostForEditing}
        />
      </Grid>
    </Grid>
  );
};

export default PostsListPage;
