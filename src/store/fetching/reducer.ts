import {
  FAILURE_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
} from '../../utils/constants/other';
import {
  FETCHING_FAILED,
  FETCHING_RESOURCE_REQUEST,
  FETCHING_SUCCESS,
  FetchingActions,
} from './types';

const initialFetchingReducer = {
  fetchingStatus: IDLE_STATUS,
  fetchingError: null,
};

export const fetchingReducer = (resource: string) => {
  return (state = initialFetchingReducer, action: FetchingActions) => {
    if (action.resource !== resource) {
      return state;
    }

    switch (action.type) {
      case FETCHING_RESOURCE_REQUEST: {
        return { ...state, fetchingStatus: LOADING_STATUS };
      }
      case FETCHING_FAILED: {
        return { ...state, fetchingStatus: FAILURE_STATUS, fetchingError: action.payload };
      }
      case FETCHING_SUCCESS: {
        return { ...state, fetchingStatus: SUCCESS_STATUS };
      }
      default:
        return state;
    }
  };
};
