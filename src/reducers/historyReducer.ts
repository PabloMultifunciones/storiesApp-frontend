import { IHistory } from '../interfaces';
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

const INITIAL_STATE = {
    historys: [],
    deleting: [],
    loading: false,
    history: null,
    countHistorysCreates: null,
    countHistorysActivies: null,
    countHistorysInactivies: null,
    countActionCreate: null,
    countActionUpdate: null,
    countActionDelete: null,
};

interface interfaceHistoryReducer {
    historys: IHistory[];
    deleting: string[];
    loading: boolean;
    history: any;
    countHistorysCreates: null | number;
    countHistorysActivies: null | number;
    countHistorysInactivies: null | number;
    countActionCreate: null | number;
    countActionUpdate: null | number;
    countActionDelete: null | number;
}

export default function HistoryReducer(
    state = INITIAL_STATE,
    action: { type: string; payload: any },
): interfaceHistoryReducer {
    switch (action.type) {
        case LOADING_HISTORY:
            return {
                ...state,
                loading: true,
            };

        case DELETING_HISTORY:
            return {
                ...state,
                deleting: [...state.deleting, action.payload],
            };

        case REQUEST_HISTORYS:
            return {
                ...state,
                historys: action.payload,
            };

        case ADD_HISTORY:
            return {
                ...state,
                historys: [...state.historys, action.payload],
            };

        case DELETE_HISTORY:
            return {
                ...state,
                historys: action.payload,
            };

        case GET_HISTORY:
            return {
                ...state,
                loading: false,
                history: action.payload,
            };

        case UPDATE_HISTORY:
            return {
                ...state,
                loading: false,
            };

        case SAVE_COUNT_HISTORYS_CREATES:
            return {
                ...state,
                countHistorysCreates: action.payload.dates,
            };

        case SAVE_COUNT_HISTORYS_A_I:
            return {
                ...state,
                countHistorysActivies: action.payload.historysActivies,
                countHistorysInactivies: action.payload.historysInactivies,
            };

        case SAVE_COUNT_ACTIONS_LAST_DAY:
            return {
                ...state,
                countActionCreate: action.payload.actionsAmounts.createdCount,
                countActionUpdate: action.payload.actionsAmounts.updatedCount,
                countActionDelete: action.payload.actionsAmounts.deletedCount,
            };

        default:
            return state;
    }
}
