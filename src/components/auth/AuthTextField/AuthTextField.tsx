import React from 'react';
import { UiTextField, UiTextFieldProps } from '../../ui/UiTextField/UiTextField';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { InputLabelProps } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  myInput: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },

  label: {
    transform: 'translate(14px, 16px) scale(1)',
  },
}));

export const AuthTextField: React.FC<UiTextFieldProps> = props => {
  const classes = useStyles();
  return (
    // @ts-ignore
    <UiTextField
      variant="outlined"
      margin="normal"
      InputLabelProps={{ classes: { root: classes.label } } as Partial<InputLabelProps>}
      InputProps={{ classes: { input: classes.myInput } } as Partial<OutlinedInputProps>}
      fullWidth
      {...props}
    />
  );
};
