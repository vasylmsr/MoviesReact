import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const filters = [
  ['Popular', 'popular'],
  ['Top rated', 'top_rated'],
  ['Upcoming', 'upcoming'],
];

type FilterByButtonProps = {
  onClick: (type: string) => void;
  currentFilter: string;
};

const FilterByButton: React.FC<FilterByButtonProps> = props => {
  const { onClick, currentFilter } = props;

  return (
    <ButtonGroup color="primary" aria-label="button group">
      {filters.map(([label, value]) => {
        const btnVariant = currentFilter === value ? 'contained' : 'outlined';
        return (
          <Button
            key={value}
            variant={btnVariant}
            onClick={() => {
              onClick(value);
            }}
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default FilterByButton;
