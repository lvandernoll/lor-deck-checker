import { Set, GameActivity } from 'interfaces';

export const REQUEST_SETS_DATA         = 'REQUEST_SETS_DATA';
export const REQUEST_SETS_DATA_SUCCESS = 'REQUEST_SETS_DATA_SUCCESS';
export const REQUEST_SETS_DATA_FAILED  = 'REQUEST_SETS_DATA_FAILED';

export const REQUEST_GAME_ACTIVITY         = 'REQUEST_GAME_ACTIVITY';
export const REQUEST_GAME_ACTIVITY_DECK    = 'REQUEST_GAME_ACTIVITY_DECK';
export const REQUEST_GAME_ACTIVITY_SUCCESS = 'REQUEST_GAME_ACTIVITY_SUCCESS';
export const REQUEST_GAME_ACTIVITY_FAILED  = 'REQUEST_GAME_ACTIVITY_FAILED';


export const requestSetsData = () => ({ type: REQUEST_SETS_DATA });
export const requestSetsDataSuccess = (setsData: Set[]) => ({ type: REQUEST_SETS_DATA_SUCCESS, payload: { setsData } });
export const requestSetsDataFailed = (errorMessage: string) => ({ type: REQUEST_SETS_DATA_FAILED, payload: { errorMessage } });

export const requestGameActivity = () => ({ type: REQUEST_GAME_ACTIVITY });
export const requestGameActivityDeck = () => ({ type: REQUEST_GAME_ACTIVITY_DECK });
export const requestGameActivitySuccess = (gameActivity: GameActivity) => ({ type: REQUEST_GAME_ACTIVITY_SUCCESS, payload: { gameActivity } });
export const requestGameActivityFailed = (errorMessage: string) => ({ type: REQUEST_GAME_ACTIVITY_FAILED, payload: { errorMessage } });
