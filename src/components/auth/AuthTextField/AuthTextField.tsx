import React from 'react';
import { UiTextField, UiTextFieldProps } from '../../ui/UiTextField/UiTextField';

export const AuthTextField: React.FC<UiTextFieldProps> = (props: UiTextFieldProps): JSX.Element => {
  // @ts-ignore
  return <UiTextField variant="outlined" margin="normal" fullWidth {...props} />;
};
