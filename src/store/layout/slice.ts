import { ILayoutState } from 'store/layout/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ILayoutState = {
  mainLayoutLoading: {
    status: false,
    counter: 0,
  },
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    startMainLayoutLoading(state) {
      state.mainLayoutLoading.counter += 1;
      state.mainLayoutLoading.status = true;
    },
    stopMainLayoutLoading(state) {
      const operationsCount = state.mainLayoutLoading.counter;
      if (operationsCount === 1) {
        state.mainLayoutLoading.counter = 0;
        state.mainLayoutLoading.status = false;
      } else if (operationsCount > 1) {
        state.mainLayoutLoading.counter -= 1;
      }
    },
  },
});

export const { startMainLayoutLoading, stopMainLayoutLoading } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
