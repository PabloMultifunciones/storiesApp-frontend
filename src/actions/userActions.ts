import Cookies from 'universal-cookie';
import { SAVE_LOGIN, CLOSE_SESION } from '../types/loginTypes';
import { loginUser, setNewPassword } from '../services/servicesUser';
import { IResponse } from '../interfaces';

interface IUser {
    username: string;
    password: string;
}

export const initUser =
    (user: { username: string; token: string }) => (dispatch: any) => {
        try {
            dispatch({
                type: SAVE_LOGIN,
                payload: user,
            });

            return 'SUCCESS';
        } catch {
            return 'FAILED';
        }
    };

export const loginRequest = (user: IUser) => async (dispatch: any) => {
    try {
        const {
            data: { error, token },
        } = await loginUser(user);

        if (error) {
            return 'FAILED';
        }

        const cookies = new Cookies();
        cookies.set('Token', token, { path: '/' });
        cookies.set('Username', user.username, { path: '/' });

        dispatch({
            type: SAVE_LOGIN,
            payload: { username: user.username, token },
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};

export const closeSesion = () => (dispatch: any) => {
    try {
        const cookie = new Cookies();
        cookie.remove('Username');
        cookie.remove('Token');

        dispatch({
            type: CLOSE_SESION,
        });

        return 'SUCCESS';
    } catch {
        return 'FAILED';
    }
};

export const changeNewPassword =
    (newPassword: string) => async (dispatch: any, getState: any) => {
        try {
            const USERNAME = getState().loginReducer.username;

            const USER = {
                username: USERNAME,
                password: newPassword,
            };

            const cookies = new Cookies();
            const token = await cookies.get('Token');
            const headers = { authorization: token };

            const RESPONSE: IResponse = await setNewPassword(headers, USER);

            if (RESPONSE.data.error) {
                return 'FAILED';
            }
            return 'SUCCESS';
        } catch {
            return 'FAILED';
        }
    };
