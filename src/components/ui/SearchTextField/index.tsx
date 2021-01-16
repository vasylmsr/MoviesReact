import IconButton from '@material-ui/core/IconButton';
import { SearchOutlined } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';

import { UiTextField } from 'components/ui';
import React from 'react';
import { UiTextFieldProps } from 'components/ui/UiTextField/UiTextField';

export const SearchTextField: React.FC<UiTextFieldProps> = props => (
  <UiTextField
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton>
            <SearchOutlined />
          </IconButton>
        </InputAdornment>
      ),
    }}
    {...props}
  />
);
