import React, { useState, useEffect } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Button, TextField, Typography, Box } from '@mui/material';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../actions/userActions';
import '../styles/pages/HistorysStyles.scss';
import { DivDashboard } from '../styles/styled';
import { IInput } from '../interfaces';

import 'toastr/build/toastr.min.css';

const ContainerHistorys = styled(Box)`
    width: 100%;
    margin-top: 50%;
`;

const Label = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DivLogin = styled(DivDashboard)`
    padding-bottom: 7px;
`;

const LabelInput = styled(Grid)`
    display: flex;
    margin: 10px !important;
`;

const Footer = styled(LabelInput)`
    display: flex;
    justify-content: center;
`;

const BtnSave = styled(Button)`
    background-color: #4eea3e !important;
    color: white !important;
`;

function Login(props: any) {
    const navigate = useNavigate();
    const [{ username, password }, setUser] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const cookies = new Cookies();
        const username = cookies.get('Username');
        const token = cookies.get('Token');

        if (username && token) {
            props.loginRequest();
        }
    });

    const inputValue = (params: IInput) => {
        setUser(prevState => ({
            ...prevState,
            [params.target.name]: params.target.value,
        }));
    };

    const submitForm = async () => {
        if (username === '') {
            toastr.error('El Usuario es un campo obligatorio');
        }

        if (password === '') {
            toastr.error('La Contraseña es un campo obligatorio');
        }

        const RESULT = await props.loginRequest({ username, password });

        if (RESULT === 'FAILED') {
            toastr.error('El Usuario y/o contraseña no son correctos');
        } else {
            navigate('/historys', { replace: true });
        }
    };

    return (
        <Grid container>
            <Grid item xs={2} md={4}></Grid>
            <Grid item xs={8} md={4}>
                <ContainerHistorys>
                    <DivLogin>
                        <Typography
                            sx={{ fontSize: '2rem', textAlign: 'center' }}
                        >
                            Iniciar Sesion
                        </Typography>
                        <LabelInput item xs={12}>
                            <Label item xs={4}>
                                <Typography>Usuario</Typography>
                            </Label>
                            <Grid item xs={8}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    name='username'
                                    variant='outlined'
                                    onChange={inputValue}
                                />
                            </Grid>
                        </LabelInput>
                        <LabelInput item xs={12}>
                            <Label item xs={4}>
                                <Typography>Contraseña</Typography>
                            </Label>
                            <Grid item xs={8}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    name='password'
                                    variant='outlined'
                                    onChange={inputValue}
                                />
                            </Grid>
                        </LabelInput>
                        <LabelInput item xs={12}>
                            <Footer item xs={12}>
                                <BtnSave onClick={submitForm}>Entrar</BtnSave>
                            </Footer>
                        </LabelInput>
                    </DivLogin>
                </ContainerHistorys>
            </Grid>
            <Grid item xs={2} md={4}></Grid>
        </Grid>
    );
}

const mapDispatchToProps = {
    loginRequest,
};

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
