export interface IHistory {
    _id?: string;
    title: string;
    description: string;
    __v?: number;
}

export interface IInput {
    target: {
        value: string;
        name: string;
    };
}

export interface IResponse {
    data: {
        error: boolean;
        message: string;
        history?: IHistory;
    };
}

export interface PropsHistoryModal {
    handleClose: Function;
    op: boolean;
    type: String;
    id?: String;
}

export interface PropsAdd {
    handleClose: Function;
    saveHistoryRequest: Function;
}

export interface PropsEdit {
    handleClose: Function;
    getHistoryRequest: Function;
    updateHistoryRequest: Function;
    id?: String;
    loading: Boolean;
    history: IHistory;
}

export interface PropsView {
    handleClose: Function;
    getHistoryRequest: Function;
    id?: String;
    history?: IHistory;
}
