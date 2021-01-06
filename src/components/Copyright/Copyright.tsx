import React from 'react';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  const currentDate = new Date().getFullYear();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {currentDate}
    </Typography>
  );
}

export default Copyright;
