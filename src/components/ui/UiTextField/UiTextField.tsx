import React from 'react';
import { TextFieldProps } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { FieldError } from 'react-hook-form/dist/types/form';

type UiTextFieldProps = TextFieldProps & {
  customError: FieldError | undefined;
  name: string;
};

export const UiTextField: React.FC<UiTextFieldProps> = (props: UiTextFieldProps) => {
  const { customError, ...otherProps } = props;
  return (
    <TextField error={Boolean(customError)} helperText={customError?.message} {...otherProps} />
  );
};
