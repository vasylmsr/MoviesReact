import React from 'react';
import { ButtonGroup, Button, withWidth, isWidthUp } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const filters = [
  ['Popular', 'popular'],
  ['Top rated', 'top_rated'],
  ['Upcoming', 'upcoming'],
] as const;

type SortingGroupButtonProps = {
  onClick: (type: string) => void;
  currentFilter: string;
  width: Breakpoint;
};

const SortingGroupButton: React.FC<SortingGroupButtonProps> = props => {
  const { onClick, currentFilter, width } = props;
  const btnGroupOrientation = isWidthUp('sm', width) ? 'horizontal' : 'vertical';
  return (
    <ButtonGroup orientation={btnGroupOrientation} color="primary" aria-label="button group">
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

export default withWidth()(React.memo(SortingGroupButton));
