import React from 'react';
import { Modal, Box, Grid, Typography } from '@mui/material';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PropsHistoryModal } from '../../../interfaces';
import Add from './add';
import View from './view';
import Edit from './edit';
import { saveHistoryRequest } from '../../../actions/historyActions';

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

function HistoryModal(props?: PropsHistoryModal) {
    const handleClose = () => {
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
                                {props?.type === 'add' && <>Historia Nueva</>}
                                {props?.type === 'view' && <>Ver Historia</>}
                                {props?.type === 'edit' && <>Editar Historia</>}
                            </Typography>
                            <BtnClose onClick={handleClose}>
                                <Typography sx={{ fontSize: '1.4rem' }}>
                                    x
                                </Typography>
                            </BtnClose>
                        </Header>
                        {props?.type === 'add' && (
                            <Add
                                handleClose={() => {
                                    props?.handleClose();
                                }}
                            />
                        )}
                        {props?.type === 'view' && (
                            <View
                                id={props?.id}
                                handleClose={() => {
                                    props?.handleClose();
                                }}
                            />
                        )}
                        {props?.type === 'edit' && (
                            <Edit
                                id={props?.id}
                                handleClose={() => {
                                    props?.handleClose();
                                }}
                            />
                        )}
                    </Grid>
                </Container>
            </Modal>
        </>
    );
}

const mapDispatchToProps = { saveHistoryRequest };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModal);
