import { IRegisterReducer, REGISTER_REQUEST, REGISTER_SUCCESS, RegisterActionTypes } from './types';
import { IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from '../../../utils/constants/other';

const initialState: IRegisterReducer = {
  registerStatus: IDLE_STATUS,
  error: null,
};

export const registerReducer = (
  previousState: IRegisterReducer = initialState,
  action: RegisterActionTypes,
): IRegisterReducer => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...previousState, registerStatus: LOADING_STATUS };
    }
    case REGISTER_SUCCESS: {
      return { ...previousState, registerStatus: SUCCESS_STATUS };
    }
    default:
      return { ...previousState };
  }
};
