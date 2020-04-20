import { CardOptions } from 'interfaces';

export interface CardOptionsAction {
  type: string,
  payload: {
    errorMessage?: string,
    cardOptions?: CardOptions,
  },
}
