import axios from 'axios';

export const loginUser = (data: any) =>
    axios({
        method: `POST`,
        url: `${process.env.REACT_APP_API_URL}/users/login`,
        data,
    });
