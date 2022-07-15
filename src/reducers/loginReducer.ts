import { SAVE_LOGIN, CLOSE_SESION } from '../types/loginTypes';

const INITIAL_STATE = {
    username: null,
    token: null,
};

interface interfaceUserReducer {
    username: string | null;
    token: string | null;
}

export default function LoginReducer(
    state = INITIAL_STATE,
    action: { type: string; payload: any },
): interfaceUserReducer {
    switch (action.type) {
        case SAVE_LOGIN:
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
            };

        case CLOSE_SESION:
            return {
                ...state,
                username: null,
                token: null,
            };

        default:
            return state;
    }
}
