import React from 'react';
import { MetaTitle } from '../../components/MetaTitle';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store';

const UserProfile: React.FC = () => {
  const { user } = useSelector((store: RootStateType) => store.auth);
  return (
    <>
      <MetaTitle title="User Profile" />
      <div>{`${user?.displayName}, wait and soon you will see you profile page)`}</div>
    </>
  );
};

export default UserProfile;
