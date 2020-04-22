import { combineReducers } from 'redux';
import { SetsDataState, setsDataReducer } from './setsData';
import { GameActivityState, gameActivityReducer } from './gameActivity';

export interface State {
  gameActivity: GameActivityState,
  setsData: SetsDataState,
}

export default combineReducers<State>({
  gameActivity: gameActivityReducer,
  setsData: setsDataReducer,
});
