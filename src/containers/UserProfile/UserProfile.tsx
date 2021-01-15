import React from 'react';
import { MetaTitle } from 'components/MetaTitle';
import { useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { Container, Grid, Typography } from '@material-ui/core';

const UserProfile: React.FC = () => {
  const { user } = useSelector((store: RootStateType) => store.auth);
  return (
    <>
      <MetaTitle title="User Profile" />
      <Container maxWidth="xl">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <img alt="User avatar" src={user?.photoURL} width="50px" />
          <Typography variant="subtitle1">Comming soon...</Typography>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
