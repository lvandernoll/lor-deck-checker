import { REQUEST_SETS_DATA, REQUEST_SETS_DATA_SUCCESS, REQUEST_SETS_DATA_FAILED } from '../actions';
import { SetsDataAction } from 'redux/interfaces';
import { Set } from 'interfaces';

export interface SetsDataState {
  isLoading: boolean,
  error: boolean,
  setsData: Set[],
}

const initialState: SetsDataState = {
  isLoading: false,
  error: false,
  setsData: [],
}

export const setsDataReducer = (
  state: SetsDataState = initialState,
  action: SetsDataAction,
): SetsDataState => {
  switch(action.type) {
    case REQUEST_SETS_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_SETS_DATA_SUCCESS:
      return {
        isLoading: false,
        error: false,
        setsData: action.payload.setsData || initialState.setsData,
      };
    case REQUEST_SETS_DATA_FAILED:
      console.error(action.payload.errorMessage || 'error');
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default [];
