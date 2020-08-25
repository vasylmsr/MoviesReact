import {
  CHECK_USER_FAILURE,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  IAuthReducer,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
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

  isAuthenticated: false,

  loginStatus: IDLE_STATUS,
  loginError: null,

  checkingUserStatus: IDLE_STATUS,
  checkingUserError: null,

  logoutStatus: IDLE_STATUS,
  logoutError: null,
};

export const authReducer = (
  prevState: IAuthReducer = initialState,
  action: UserActionsType,
): IAuthReducer => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loginError: null,
        loginStatus: LOADING_STATUS,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        user: action.payload,
        loginStatus: SUCCESS_STATUS,
      };
    case LOGIN_FAILURE:
      return {
        ...prevState,
        user: null,
        loginStatus: FAILURE_STATUS,
        loginError: action.payload,
      };

    case CHECK_USER_REQUEST:
      return {
        ...prevState,
        user: null,
        loginStatus: FAILURE_STATUS,
        loginError: action.payload,
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

    case LOGOUT_SUCCESS:
      return {
        ...prevState,
        user: null,
        logoutStatus: SUCCESS_STATUS,
      };

    case LOGOUT_FAILURE:
      return {
        ...prevState,
        logoutStatus: FAILURE_STATUS,
      };

    case LOGOUT_REQUEST:
      return {
        ...prevState,
        logoutStatus: LOADING_STATUS,
      };

    default:
      return { ...prevState };
  }
};
