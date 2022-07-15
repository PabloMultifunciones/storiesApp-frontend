import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { closeSesion } from '../../actions/userActions';

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

function UserModal(props?: {
    op: boolean;
    handleClose: Function;
    closeSesion: Function;
}) {
    const navigate = useNavigate();

    const handleClose = () => {
        props?.handleClose();
    };

    const closeSesion = () => {
        props?.closeSesion();
        props?.handleClose();
        navigate('/login', { replace: true });
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
                        <Button onClick={closeSesion}>cerrar sesion</Button>
                    </Grid>
                </Container>
            </Modal>
        </>
    );
}

const mapDispatchToProps = { closeSesion };

const mapStateToProps = (props: any) => props.loginReducer;

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
