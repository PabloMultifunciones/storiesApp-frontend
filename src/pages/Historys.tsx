import React, { useState, useEffect } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Button, Typography, Box } from '@mui/material';
import ControlPoint from '@mui/icons-material/ControlPoint';
import ClipLoader from 'react-spinners/ClipLoader';
import EditIcon from '@mui/icons-material/Edit';
import {
    historysRequest,
    saveHistoryRequest,
    deleteHistoryRequest,
} from '../actions/historyActions';
import { IHistory } from '../interfaces';
import Scrollbar from '../components/scrollbar';
import HistoryModal from '../components/modals/HistoryModal';
import '../styles/pages/HistorysStyles.scss';
import { DivDashboard, ContentCenter, AddHistory } from '../styles/styled';

import 'toastr/build/toastr.min.css';

const HistoryBody = styled.div`
    padding: 5px;
`;

const HistoryHeader = styled.div`
    display: flex;
`;

const HistoryText = styled(Typography)`
    && {
        color: ${(props: {
            color?: string;
            fontSize?: string;
            padding?: string;
        }) => props.color || 'black'};
        font-size: ${(props: {
            color?: string;
            fontSize?: string;
            padding?: string;
        }) => props.fontSize || '15px'};
        padding: ${(props: {
            color?: string;
            fontSize?: string;
            padding?: string;
        }) => props.padding || '0'};
    }
`;

const ContainerHistorys = styled(Box)`
    width: 100%;
`;

const GridAddHistory = styled(Grid)`
    padding-bottom: 7px;
    height: 200px;
`;

const DivFooter = styled(Grid)`
    margin-top: auto;
`;

function Historys(props: any) {
    const [{ openAdd, openView, openEdit, idHistory }, setOpen] = useState({
        openAdd: false,
        openView: false,
        openEdit: false,
        idHistory: '',
    });

    const handleOpenAdd = () => {
        setOpen({
            openAdd: true,
            openView: false,
            openEdit: false,
            idHistory: '',
        });
    };

    const handleOpenView = (id?: string) => {
        if (id === undefined) {
            return;
        }
        setOpen({
            openAdd: false,
            openView: true,
            openEdit: false,
            idHistory: id,
        });
    };

    const handleOpenEdit = (id?: string) => {
        if (id === undefined) {
            return;
        }
        setOpen({
            openAdd: false,
            openView: false,
            openEdit: true,
            idHistory: id,
        });
    };

    const handleClose = () => {
        setOpen({
            openAdd: false,
            openView: false,
            openEdit: false,
            idHistory: '',
        });
    };

    useEffect(() => {
        props.historysRequest();
    });

    const deleteHistory = async (history: IHistory) => {
        const RESPONSE: string = await props.deleteHistoryRequest(history._id);

        if (RESPONSE === 'FAILED') {
            toastr.error('Ha ocurrido un error');
            return;
        }

        toastr.success('Se ha eliminado correctamente');
    };

    return (
        <Grid container>
            <Scrollbar page='historys' />

            <Grid xs={10} container item className='historys'>
                <ContainerHistorys>
                    <Grid container sx={{ paddingLeft: '5px' }}>
                        {props.historys.map((history: IHistory) => (
                            <GridAddHistory
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={history._id}
                            >
                                {props.deleting.includes(history._id) ? (
                                    <ContentCenter>
                                        <ClipLoader color='blue' size={120} />
                                    </ContentCenter>
                                ) : (
                                    <DivDashboard>
                                        <HistoryHeader>
                                            <HistoryText
                                                fontSize='25px'
                                                padding='5px'
                                            >
                                                {history.title}
                                            </HistoryText>
                                            <Button
                                                className='btn-edit'
                                                onClick={() =>
                                                    handleOpenEdit(history._id)
                                                }
                                            >
                                                <EditIcon />
                                            </Button>
                                        </HistoryHeader>
                                        <HistoryBody>
                                            <HistoryText color='grey'>
                                                {history.description}
                                            </HistoryText>
                                        </HistoryBody>
                                        <DivFooter>
                                            <Button
                                                className='btn-danger'
                                                onClick={() =>
                                                    deleteHistory(history)
                                                }
                                            >
                                                Borrar
                                            </Button>
                                            <Button
                                                className='btn-view'
                                                onClick={() =>
                                                    handleOpenView(history._id)
                                                }
                                            >
                                                Ver
                                            </Button>
                                        </DivFooter>
                                    </DivDashboard>
                                )}
                            </GridAddHistory>
                        ))}
                        <GridAddHistory item xs={12} sm={6} md={4}>
                            <AddHistory
                                data-testid='btn-add-history'
                                onClick={() => handleOpenAdd()}
                            >
                                <ControlPoint sx={{ fontSize: 100 }} />
                            </AddHistory>
                            <HistoryModal
                                id={idHistory}
                                op={openEdit}
                                handleClose={handleClose}
                                type='edit'
                            />
                            <HistoryModal
                                op={openAdd}
                                handleClose={handleClose}
                                type='add'
                            />
                            <HistoryModal
                                id={idHistory}
                                op={openView}
                                handleClose={handleClose}
                                type='view'
                            />
                        </GridAddHistory>
                    </Grid>
                </ContainerHistorys>
            </Grid>
        </Grid>
    );
}

const mapDispatchToProps = {
    historysRequest,
    saveHistoryRequest,
    deleteHistoryRequest,
};

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(Historys);
