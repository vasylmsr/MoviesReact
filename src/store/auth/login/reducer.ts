import {
  CHECK_USER_FAILURE,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  IAuthReducer,
  LOGOUT,
  UserActionsType,
} from './types';
import {
  FAILURE_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
} from '../../../utils/constants/other';

const initialState: IAuthReducer = {
  user: null,

  checkingUserStatus: IDLE_STATUS,
  checkingUserError: null,
};

export const authReducer = (
  prevState: IAuthReducer = initialState,
  action: UserActionsType,
): IAuthReducer => {
  switch (action.type) {
    case CHECK_USER_REQUEST:
      return {
        ...prevState,
        user: null,
        checkingUserStatus: LOADING_STATUS,
        checkingUserError: null,
      };

    case CHECK_USER_FAILURE:
      return {
        ...prevState,
        checkingUserStatus: FAILURE_STATUS,
        checkingUserError: action.payload,
      };

    case CHECK_USER_SUCCESS:
      return {
        ...prevState,
        user: action.payload,
        checkingUserStatus: SUCCESS_STATUS,
      };

    case LOGOUT:
      return {
        ...prevState,
        user: null,
      };

    default:
      return { ...prevState };
  }
};
