import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogProps } from '@material-ui/core';
import { IMovieVideo } from 'api/axios/theMovieDb/moviesApi/types';

export type AlertDialogProps = DialogProps & {
  title?: string;
  video: IMovieVideo;
};

const YoutubeDialog: React.FC<AlertDialogProps> = props => {
  const { open, onClose, video, title = video.name } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ display: 'flex' }}>
        <div style={{ width: '500px' }}>
          <iframe
            title="YT"
            width="100%"
            height="350px"
            src={`https://www.youtube.com/embed/${video.key}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeDialog;
