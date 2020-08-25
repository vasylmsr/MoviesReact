import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button, { ButtonProps } from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -25%)',
    },
  }),
);

type UiButtonProps = ButtonProps & {
  loading?: boolean;
  text?: string;
};

export const UiButton: React.FC<UiButtonProps> = ({
  loading,
  onClick,
  children,
  text,
  disabled,
  className,
  ...props
}: UiButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.button}>
      <Button
        className={className}
        variant="contained"
        color="primary"
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {text || children}
      </Button>
      {loading && (
        <div className={classes.buttonProgress}>
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
};
