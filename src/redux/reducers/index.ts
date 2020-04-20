import { combineReducers } from 'redux';
import { SetsDataState, setsDataReducer } from './setsData';

export interface State {
  setsData: SetsDataState,
}

export default combineReducers<State>({
  setsData: setsDataReducer,
});
