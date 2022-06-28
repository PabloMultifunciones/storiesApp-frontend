import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import toastr from 'toastr';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ContentCenter } from '../../../styles/styled';
import { IInput, PropsAdd } from '../../../interfaces';
import { saveHistoryRequest } from '../../../actions/historyActions';

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

function Add(props?: PropsAdd) {
    const [history, setHistory] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    const submitForm = async () => {
        let errorTitle = false;
        let errorDescription = false;
        setLoading(true);
        setErrorTitle(false);
        setErrorDescription(false);

        if (props?.saveHistoryRequest === undefined) {
            toastr.error('Ha ocurrido un error');
            setLoading(false);
            return;
        }

        if (history.title.length < 6) {
            setErrorTitle(true);
            errorTitle = true;
            toastr.error('El titulo debe ser mayor a 5');
        }

        if (history.description.length < 10) {
            errorDescription = true;
            setErrorDescription(true);
            toastr.error('La descripcion debe ser mayor a 10');
        }

        if (!errorTitle && !errorDescription) {
            const RESPONSE: string = await props.saveHistoryRequest(history);

            if (RESPONSE === 'FAILED') {
                toastr.error('Ha ocurrido un error');
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
            {loading ? (
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

const mapDispatchToProps = { saveHistoryRequest };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(Add);
