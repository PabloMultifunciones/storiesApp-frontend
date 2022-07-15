import Cookies from 'universal-cookie';
import { SAVE_LOGIN, CLOSE_SESION } from '../types/loginTypes';
import { loginUser } from '../services/servicesUser';

interface IUser {
    username: string;
    password: string;
}

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
