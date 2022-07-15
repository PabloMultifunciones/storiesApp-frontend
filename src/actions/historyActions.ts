import Cookies from 'universal-cookie';
import { IHistory, IResponse } from '../interfaces';
import {
    REQUEST_HISTORYS,
    ADD_HISTORY,
    DELETE_HISTORY,
    DELETING_HISTORY,
    GET_HISTORY,
    LOADING_HISTORY,
    UPDATE_HISTORY,
    SAVE_COUNT_HISTORYS_CREATES,
    SAVE_COUNT_HISTORYS_A_I,
    SAVE_COUNT_ACTIONS_LAST_DAY,
} from '../types/historyTypes';
import {
    deleteHistory,
    getHistorys,
    saveHistory,
    getHistory,
    updateHistory,
    getCountHistorysCreates,
    getHistorysAactiviesInactives,
    getActionsLastDay,
} from '../services/servicesHistory';

export const historysRequest = () => async (dispatch: any) => {
    try {
        const cookies = new Cookies();
        const token = await cookies.get('Token');
        const headers = { authorization: token };

        const RESPONSE = await getHistorys(headers);

        dispatch({
            type: REQUEST_HISTORYS,
            payload: RESPONSE.data,
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};

export const saveHistoryRequest =
    (payload: IHistory) => async (dispatch: any) => {
        try {
            const cookies = new Cookies();
            const token = await cookies.get('Token');
            const headers = { authorization: token };

            const RESPONSE: IResponse = await saveHistory(headers, payload);

            if (RESPONSE.data.error) {
                return 'FAILED';
            }

            dispatch({
                type: ADD_HISTORY,
                payload: RESPONSE.data.history,
            });

            return 'SUCCESS';
        } catch {
            return 'FAILED';
        }
    };

export const deleteHistoryRequest =
    (id: string) => async (dispatch: any, getState: any) => {
        try {
            const cookies = new Cookies();
            const token = await cookies.get('Token');
            const headers = { authorization: token };

            const RESPONSE: IResponse = await deleteHistory(headers, id);

            if (RESPONSE.data.error) {
                return 'FAILED';
            }

            dispatch({
                type: DELETING_HISTORY,
                payload: id,
            });

            const HISTORYS = getState().historyReducer.historys;
            const HISTORYS_UPDATED = HISTORYS.filter(
                (elem: IHistory) => elem._id !== id,
            );

            dispatch({
                type: DELETE_HISTORY,
                payload: HISTORYS_UPDATED,
            });

            return 'SUCCESS';
        } catch {
            return 'FAILED';
        }
    };

export const getHistoryRequest = (id: string) => async (dispatch: any) => {
    try {
        const cookies = new Cookies();
        const token = await cookies.get('Token');
        const headers = { authorization: token };

        dispatch({
            type: LOADING_HISTORY,
        });

        const RESPONSE: IResponse = await getHistory(headers, id);

        if (RESPONSE.data.error) {
            return 'FAILED';
        }

        dispatch({
            type: GET_HISTORY,
            payload: RESPONSE.data.history,
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};

export const updateHistoryRequest =
    (id: string, history: IHistory) => async (dispatch: any) => {
        try {
            const cookies = new Cookies();
            const token = await cookies.get('Token');
            const headers = { authorization: token };

            dispatch({
                type: LOADING_HISTORY,
            });

            const RESPONSE: IResponse = await updateHistory(
                headers,
                id,
                history,
            );

            if (RESPONSE.data.error) {
                return 'FAILED';
            }

            dispatch({
                type: UPDATE_HISTORY,
            });

            return 'SUCCESS';
        } catch {
            return 'FAILED';
        }
    };

export const countCreateHistorysRequest = () => async (dispatch: any) => {
    try {
        const cookies = new Cookies();
        const token = await cookies.get('Token');
        const headers = { authorization: token };

        const RESPONSE = await getCountHistorysCreates(headers);

        dispatch({
            type: SAVE_COUNT_HISTORYS_CREATES,
            payload: RESPONSE.data,
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};

export const getHistorysAI = () => async (dispatch: any) => {
    try {
        const cookies = new Cookies();
        const token = await cookies.get('Token');
        const headers = { authorization: token };

        const RESPONSE = await getHistorysAactiviesInactives(headers);

        dispatch({
            type: SAVE_COUNT_HISTORYS_A_I,
            payload: RESPONSE.data,
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};

export const getActions = () => async (dispatch: any) => {
    try {
        const cookies = new Cookies();
        const token = await cookies.get('Token');
        const headers = { authorization: token };

        const RESPONSE = await getActionsLastDay(headers);

        dispatch({
            type: SAVE_COUNT_ACTIONS_LAST_DAY,
            payload: RESPONSE.data,
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};
