import IconButton from '@material-ui/core/IconButton';
import { SearchOutlined } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';

import { UiTextField } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { UiTextFieldProps } from 'components/ui/UiTextField/UiTextField';

export const SearchTextField: React.FC<
  UiTextFieldProps & { onSearch: (value: string) => any }
> = props => {
  const { value, onSearch, ...otherProps } = props;
  const [newValue, setNewValue] = useState('');
  useEffect(() => {
    setNewValue(value as string);
  }, [value]);

  const handleOnSearch = () => onSearch(newValue);
  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  };

  return (
    <UiTextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleOnSearch}>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyPress={handleEnter}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewValue(event.target.value)}
      value={newValue}
      {...otherProps}
    />
  );
};
