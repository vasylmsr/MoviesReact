import React from 'react';
import { useHistory } from 'react-router';
import { UiButton } from '../components/ui/UiButton/UiButton';
import { HOME } from '../utils/constants/routes';

export const Landing: React.FC = () => {
  const history = useHistory();
  const goToApplication = () => history.push(HOME);

  return <UiButton onClick={goToApplication}>App</UiButton>;
};
