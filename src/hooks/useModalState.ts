import React from 'react';

export function useModalState(modalVisibility = false) {
  const [isOpened, setOpen] = React.useState<boolean>(modalVisibility);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return {
    isOpened,
    handleOpen,
    handleClose,
  };
}
