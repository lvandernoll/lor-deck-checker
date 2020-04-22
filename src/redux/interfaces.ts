import { Set, GameActivity } from 'interfaces';

interface GenericAction {
  type: string,
}
export interface SetsDataAction extends GenericAction {
  payload: {
    errorMessage?: string,
    setsData?: Set[],
  },
}

export interface GameActivityAction extends GenericAction {
  payload: {
    errorMessage?: string,
    gameActivity: GameActivity,
  },
}
