import React from 'react';
import Typography from '@material-ui/core/Typography';

const Copyright: React.FC = () => {
  const currentDate = new Date().getFullYear();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {currentDate}
    </Typography>
  );
};

export default Copyright;
