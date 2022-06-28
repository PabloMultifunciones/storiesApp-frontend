import axios from 'axios';
import { IHistory } from '../interfaces';

export const getHistorys = () =>
    axios({
        method: `GET`,
        url: `${process.env.REACT_APP_API_URL}/historys`,
    });

export const saveHistory = (data: IHistory) =>
    axios({
        method: `POST`,
        url: `${process.env.REACT_APP_API_URL}/historys`,
        data,
    });

export const deleteHistory = (id: string) =>
    axios({
        method: `DELETE`,
        url: `${process.env.REACT_APP_API_URL}/historys/${id}`,
    });

export const getHistory = (id: string) =>
    axios({
        method: `GET`,
        url: `${process.env.REACT_APP_API_URL}/historys/${id}`,
    });

export const updateHistory = (id: string, data: IHistory) =>
    axios({
        method: `PUT`,
        url: `${process.env.REACT_APP_API_URL}/historys/${id}`,
        data,
    });

export const getCountHistorysCreates = () =>
    axios({
        method: `GET`,
        url: `${process.env.REACT_APP_API_URL}/historys/getCountHistorysCreates`,
    });

export const getHistorysAactiviesInactives = () =>
    axios({
        method: `GET`,
        url: `${process.env.REACT_APP_API_URL}/historys/activies&inactivies`,
    });

export const getActionsLastDay = () =>
    axios({
        method: `GET`,
        url: `${process.env.REACT_APP_API_URL}/historys/actionsLastDay`,
    });
