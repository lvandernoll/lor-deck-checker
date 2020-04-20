import { Set } from 'interfaces';

export interface SetsDataAction {
  type: string,
  payload: {
    errorMessage?: string,
    setsData?: Set[],
  },
}
