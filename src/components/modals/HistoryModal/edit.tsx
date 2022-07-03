import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import toastr from 'toastr';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ContentCenter } from '../../../styles/styled';
import { IInput, PropsEdit } from '../../../interfaces';
import {
    getHistoryRequest,
    updateHistoryRequest,
} from '../../../actions/historyActions';

const ContainerClipLoader = styled(ContentCenter)`
    border: 0;
    width: 100%;
    margin: 0;
`;

const LabelInput = styled(Grid)`
    display: flex;
    margin: 10px !important;
`;

const Label = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Footer = styled(LabelInput)`
    display: flex;
    justify-content: center;
`;

const BtnSave = styled(Button)`
    background-color: #4eea3e !important;
    color: white !important;
`;

function Edit(props?: PropsEdit) {
    const [history, setHistory] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    useEffect(() => {
        if (loading && props?.loading === false) {
            props?.getHistoryRequest(props?.id);
            setLoading(false);
        }
    }, [loading, props]);

    const submitForm = async () => {
        let errorTitle = false;
        let errorDescription = false;
        setLoading(true);
        setErrorTitle(false);
        setErrorDescription(false);

        if (props?.history?.title === undefined) {
            return;
        }

        if (props?.history?.description === undefined) {
            return;
        }

        const title =
            history.title === '' ? props?.history?.title : history.title;

        if (title.length < 6) {
            setErrorTitle(true);
            errorTitle = true;
            toastr.error('El titulo debe ser mayor a 5');
        }

        const description =
            history.description === ''
                ? props?.history?.description
                : history.description;

        if (description.length < 6) {
            errorDescription = true;
            setErrorDescription(true);
            toastr.error('La descripcion debe ser mayor a 10');
        }

        if (!errorTitle && !errorDescription) {
            const RESPONSE: string = await props?.updateHistoryRequest(
                props?.history?._id,
                {
                    title,
                    description,
                },
            );

            if (RESPONSE === 'FAILED') {
                toastr.error('Ha ocurrido un error');
                props?.handleClose();
                setLoading(false);
                return;
            }

            toastr.success('Se ha enviado correctamente');
            setHistory({ title: '', description: '' });
            props?.handleClose();
        }

        setLoading(false);
    };

    const inputValue = (params: IInput) => {
        setHistory(prevState => ({
            ...prevState,
            [params.target.name]: params.target.value,
        }));
    };

    return (
        <>
            {props?.loading ||
            props?.history?.title === '' ||
            props?.history?.description === '' ? (
                <ContainerClipLoader>
                    <ClipLoader color='blue' size={120} />
                </ContainerClipLoader>
            ) : (
                <>
                    <LabelInput item xs={12}>
                        <Label item xs={4}>
                            <Typography>Titulo</Typography>
                        </Label>
                        <Grid item xs={8}>
                            <TextField
                                sx={{ width: '90%' }}
                                defaultValue={props?.history?.title}
                                error={errorTitle}
                                name='title'
                                variant='outlined'
                                onChange={inputValue}
                            />
                        </Grid>
                    </LabelInput>
                    <LabelInput item xs={12}>
                        <Label item xs={4}>
                            <Typography>Descripcion</Typography>
                        </Label>
                        <Grid item xs={8}>
                            <TextField
                                sx={{ width: '90%' }}
                                defaultValue={props?.history?.description}
                                error={errorDescription}
                                name='description'
                                variant='outlined'
                                onChange={inputValue}
                            />
                        </Grid>
                    </LabelInput>
                    <Footer item xs={12}>
                        <BtnSave onClick={submitForm}>Guardar</BtnSave>
                    </Footer>
                </>
            )}
        </>
    );
}

const mapDispatchToProps = { getHistoryRequest, updateHistoryRequest };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
