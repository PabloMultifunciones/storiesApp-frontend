import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, Typography, TextField, Button } from '@mui/material';
import { connect } from 'react-redux';
import toastr from 'toastr';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { closeSesion, changeNewPassword } from '../../actions/userActions';
import { ContentCenter } from '../../styles/styled';
import { IInput } from '../../interfaces';

const Container = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    background-color: white;
    box-shadow: 24;
    border: 0 !important;
`;

const LabelInput = styled(Grid)`
    display: flex;
    margin: 10px !important;
`;

const Header = styled(LabelInput)`
    color: white;
    font-size: 3rem !important;
    margin: 0 !important;
    padding: 20px !important;
    display: flex;
    justify-content: center;
    background-color: #1c72e7;
`;

const BtnClose = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 7px;
    &: hover {
        cursor: pointer;
        color: gray;
    }
`;

const Body = styled(Grid)`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column !important;
`;

const Label = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContainerClipLoader = styled(ContentCenter)`
    border: 0;
    width: 100%;
    margin: 0;
`;

interface PropsUserModal {
    op: boolean;
    handleClose: Function;
    closeSesion: Function;
    changeNewPassword: Function;
}

function UserModal(props?: PropsUserModal) {
    const [changePassword, setChangePassword] = useState(false);
    const [changePasswordLoad, setChangePasswordLoad] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setChangePassword(false);
    }, [props?.op]);

    const openChangePassword = () => {
        setChangePassword(true);
    };

    const handleClose = () => {
        props?.handleClose();
    };

    const closeSesion = () => {
        props?.closeSesion();
        props?.handleClose();
        navigate('/login', { replace: true });
    };

    const inputValue = (params: IInput) => {
        setNewPassword(params.target.value);
    };

    const submitNewPassword = async () => {
        setChangePasswordLoad(true);
        setErrorPassword(false);

        if (newPassword === '') {
            setErrorPassword(true);
            toastr.error('Debe ingresar una nueva contraseña');
            setChangePasswordLoad(false);
            return;
        }

        const RESULT: string = await props?.changeNewPassword(newPassword);
        setNewPassword('');

        if (RESULT === 'FAILED') {
            toastr.error(
                'Ha ocurrido un error al cambiar la contraseña. Intentelo denuevo mas tarde',
            );
            setChangePasswordLoad(false);
            return;
        }

        toastr.success('La contraseña ha sido cambiada correctamente');
        setChangePasswordLoad(false);
        props?.handleClose();
    };

    return (
        <>
            <Modal
                open={props?.op || false}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Container>
                    <Grid container item>
                        <Header item xs={12}>
                            <Typography sx={{ textAlign: 'center' }}>
                                Opciones
                            </Typography>
                            <BtnClose onClick={handleClose}>
                                <Typography sx={{ fontSize: '1.4rem' }}>
                                    x
                                </Typography>
                            </BtnClose>
                        </Header>
                        <Body>
                            {changePassword ? (
                                <>
                                    {changePasswordLoad ? (
                                        <ContainerClipLoader>
                                            <ClipLoader
                                                color='blue'
                                                size={120}
                                            />
                                        </ContainerClipLoader>
                                    ) : (
                                        <>
                                            <LabelInput item xs={12}>
                                                <Label item xs={4}>
                                                    <Typography>
                                                        Nueva Contraseña
                                                    </Typography>
                                                </Label>
                                                <Grid item xs={8}>
                                                    <TextField
                                                        type='password'
                                                        required
                                                        sx={{ width: '90%' }}
                                                        error={errorPassword}
                                                        name='title'
                                                        variant='outlined'
                                                        onChange={inputValue}
                                                    />
                                                </Grid>
                                            </LabelInput>
                                            <Button onClick={submitNewPassword}>
                                                Confirmar
                                            </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Button onClick={openChangePassword}>
                                        Cambiar Contraseña
                                    </Button>
                                    <Button onClick={closeSesion}>
                                        Cerrar sesion
                                    </Button>
                                </>
                            )}
                        </Body>
                    </Grid>
                </Container>
            </Modal>
        </>
    );
}

const mapDispatchToProps = { closeSesion, changeNewPassword };

const mapStateToProps = (props: any) => props.loginReducer;

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
