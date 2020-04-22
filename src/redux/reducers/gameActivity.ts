import { REQUEST_GAME_ACTIVITY, REQUEST_GAME_ACTIVITY_SUCCESS, REQUEST_GAME_ACTIVITY_FAILED, REQUEST_GAME_ACTIVITY_DECK, REQUEST_GAME_ACTIVITY_DECK_SUCCESS } from '../actions';
import { GameActivityAction } from 'redux/interfaces';
import { GameActivity } from 'interfaces';

export interface GameActivityState {
  isLoading: boolean,
  error: boolean,
  gameActivity: GameActivity,
}

const initialState: GameActivityState = {
  isLoading: false,
  error: false,
  gameActivity: {
    playerName: null,
    opponentName: null,
    gameState: 'Not connected',
    deckCode: '',
  },
}

export const gameActivityReducer = (
  state: GameActivityState = initialState,
  action: GameActivityAction,
): GameActivityState => {
  switch(action.type) {
    case REQUEST_GAME_ACTIVITY:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_GAME_ACTIVITY_DECK:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_GAME_ACTIVITY_SUCCESS:
      const { playerName, opponentName, gameState } = action.payload.gameActivity;
      return {
        isLoading: false,
        error: false,
        gameActivity: {
          playerName: playerName || state.gameActivity.playerName,
          opponentName: opponentName || state.gameActivity.opponentName,
          gameState: gameState || state.gameActivity.gameState,
          deckCode: state.gameActivity.deckCode,
        }
      };
    case REQUEST_GAME_ACTIVITY_DECK_SUCCESS:
      return {
        isLoading: false,
        error: false,
        gameActivity: {
          playerName: state.gameActivity.playerName,
          opponentName: state.gameActivity.opponentName,
          gameState: state.gameActivity.gameState,
          deckCode: action.payload.gameActivity.deckCode,
        }
      };
    case REQUEST_GAME_ACTIVITY_FAILED:
      console.error(action.payload.errorMessage || 'error');
      return {
        gameActivity: initialState.gameActivity,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}
