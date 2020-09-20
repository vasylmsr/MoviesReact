import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { IPostData } from '../../../api/auth';
import DefaultImg from '../../../assets/images/default.png';
import { formatDate } from '../../../utils/helpers';

type PostCardProps = {
  post: IPostData;
};

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(2),
  },
}));

export const PostCard: React.FC<PostCardProps> = React.memo(
  (props: PostCardProps): JSX.Element => {
    const classes = useStyles();
    const { post } = props;

    const isNewsUpdated = post.createdAt.getTime() !== post.updatedAt.getTime();
    return (
      <Paper>
        <div>
          <img
            src={post.photoUrl || DefaultImg}
            width="100%"
            alt="News picture"
            title="News picture"
          />
        </div>
        <div className={classes.content}>
          <Typography gutterBottom variant="h5" component="h3">
            {post.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="p">
            {formatDate(post.createdAt)}
          </Typography>
          {post.location && (
            <Typography gutterBottom variant="subtitle1" component="p">
              {post.location}
            </Typography>
          )}
          {isNewsUpdated && (
            <Typography align="right" variant="body2" color="textSecondary" component="p">
              Updated {formatDate(post.updatedAt)}
            </Typography>
          )}
        </div>
      </Paper>
    );
  },
);
