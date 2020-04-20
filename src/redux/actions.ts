import { Set } from 'interfaces';

export const REQUEST_SETS_DATA         = 'REQUEST_SETS_DATA';
export const REQUEST_SETS_DATA_SUCCESS = 'REQUEST_SETS_DATA_SUCCESS';
export const REQUEST_SETS_DATA_FAILED  = 'REQUEST_SETS_DATA_FAILED';


export const requestSetsData = () => ({ type: REQUEST_SETS_DATA });
export const requestSetsDataSuccess = (setsData: Set[]) => ({ type: REQUEST_SETS_DATA_SUCCESS, payload: { setsData } });
export const requestSetsDataFailed = (errorMessage: string) => ({ type: REQUEST_SETS_DATA_FAILED, payload: { errorMessage } });
