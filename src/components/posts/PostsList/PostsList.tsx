import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { IPostData } from '../../../api/auth';
import { PostCard } from '../PostCard/PostCard';

type PostListProps = {
  posts: Array<IPostData>;
  className: string;
};

const useStyles = makeStyles(theme => ({
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 330px))',
    justifyContent: 'center',
    width: '100%',
    gridGap: '20px',
  },
}));

export const PostsList: React.FC<PostListProps> = (props: PostListProps): JSX.Element => {
  const classes = useStyles();
  const { posts, className } = props;
  return (
    <div className={clsx(classes.list, className)}>
      {posts.map((post: IPostData) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
