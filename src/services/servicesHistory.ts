import axios from 'axios';
import { IHistory } from '../interfaces';

export const getHistorys = (headers: { authorization: string }) =>
    axios({
        method: `GET`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys`,
    });

export const saveHistory = (
    headers: { authorization: string },
    data: IHistory,
) =>
    axios({
        method: `POST`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys`,
        data,
    });

export const deleteHistory = (headers: { authorization: string }, id: string) =>
    axios({
        method: `DELETE`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys/${id}`,
    });

export const getHistory = (headers: { authorization: string }, id: string) =>
    axios({
        method: `GET`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys/${id}`,
    });

export const updateHistory = (
    headers: { authorization: string },
    id: string,
    data: IHistory,
) =>
    axios({
        method: `PUT`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys/${id}`,
        data,
    });

export const getCountHistorysCreates = (headers: { authorization: string }) =>
    axios({
        method: `GET`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys/getCountHistorysCreates`,
    });

export const getHistorysAactiviesInactives = (headers: {
    authorization: string;
}) =>
    axios({
        method: `GET`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys/activies&inactivies`,
    });

export const getActionsLastDay = (headers: { authorization: string }) =>
    axios({
        method: `GET`,
        headers,
        url: `${process.env.REACT_APP_API_URL}/historys/actionsLastDay`,
    });
