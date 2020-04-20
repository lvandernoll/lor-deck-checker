import { REQUEST_CARD_OPTIONS, REQUEST_CARD_OPTIONS_SUCCESS, REQUEST_CARD_OPTIONS_FAILED } from '../actions';
import { CardOptions } from 'interfaces';
import { CardOptionsAction } from 'redux/interfaces';

export interface CardOptionsState {
  isLoading: boolean,
  error: boolean,
  cardOptions: CardOptions,
}

const initialState: CardOptionsState = {
  isLoading: false,
  error: false,
  cardOptions: {
    example: '',
  },
}

export const cardOptionsReducer = (
  state: CardOptionsState = initialState,
  action: CardOptionsAction,
): CardOptionsState => {
  switch(action.type) {
    case REQUEST_CARD_OPTIONS:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_CARD_OPTIONS_SUCCESS:
      return {
        isLoading: false,
        error: false,
        cardOptions: action.payload.cardOptions || initialState.cardOptions,
      };
    case REQUEST_CARD_OPTIONS_FAILED:
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
