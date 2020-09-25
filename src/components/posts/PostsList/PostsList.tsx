import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useTheme from '@material-ui/core/styles/useTheme';
import Masonry from 'react-masonry-css';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { IPostData } from '../../../api/auth';
import { PostCard } from '../PostCard/PostCard';

type PostListProps = {
  posts: Array<IPostData>;
  className: string;
  loading: boolean;
};

const useStyles = makeStyles(theme => ({
  masonry: {
    display: 'flex',
    marginLeft: theme.spacing(-4),
    width: 'inherit',
  },
  masonryColumn: {
    marginTop: '30px',
    paddingLeft: theme.spacing(4),
    backgroundClip: 'padding-box',
    '& > div': {
      marginTop: '20px',
    },
  },
  loaderWrapper: {
    padding: theme.spacing(4),
  },
}));

export const PostsList: React.FC<PostListProps> = (props: PostListProps): JSX.Element => {
  const classes = useStyles();
  const { posts, loading, className } = props;
  const theme = useTheme();

  const breakpointCols = {
    default: 4,
    [theme.breakpoints.values.xl]: 4,
    [theme.breakpoints.values.lg]: 3,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 1,
    [theme.breakpoints.values.xs]: 1,
  };

  return (
    <>
      {loading ? (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointCols}
          className={clsx(classes.masonry, className)}
          columnClassName={classes.masonryColumn}
        >
          {posts.map((post: IPostData) => (
            <PostCard post={post} key={post.id} />
          ))}
        </Masonry>
      )}
    </>
  );
};
