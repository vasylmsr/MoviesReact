import { useCallback, useEffect, useState } from 'react';
import { useModalState } from './useModalState';

export function useModalWithData<T>() {
  const { isOpened, handleOpen, handleClose } = useModalState();
  const closeModal = useCallback(() => {
    setData(undefined);
  }, []);
  const [data, setData] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (data) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [handleOpen, handleClose, data]);

  return {
    isOpened,
    handleOpen,
    closeModal,
    data,
    setData,
  };
}
