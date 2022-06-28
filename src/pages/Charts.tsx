import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Box } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import {
    historysRequest,
    saveHistoryRequest,
    deleteHistoryRequest,
} from '../actions/historyActions';
import Actions from '../components/charts/actionslastday';
import Users from '../components/charts/historysactivies';
import HistorysCreates from '../components/charts/historyscreates';
import Scrollbar from '../components/scrollbar';
import '../styles/pages/HistorysStyles.scss';
import { ContentCenter } from '../styles/styled';

import 'toastr/build/toastr.min.css';

Chart.register(...registerables);

const ContainerHistorys = styled(Box)`
    width: 100%;
`;

const ChartContainer = styled(Grid)`
    padding-bottom: 7px;
`;

function Charts(props: any) {
    useEffect(() => {
        props.historysRequest();
    });

    return (
        <Grid container>
            <Scrollbar page='charts' />
            <Grid xs={10} container item className='historys'>
                <ContainerHistorys>
                    <Grid container sx={{ paddingLeft: '5px' }}>
                        <ChartContainer item xs={8}>
                            <ContentCenter>
                                <Actions />
                            </ContentCenter>
                        </ChartContainer>
                        <ChartContainer item xs={4}>
                            <ContentCenter>
                                <Users />
                            </ContentCenter>
                        </ChartContainer>
                        <ChartContainer item xs={12}>
                            <ContentCenter>
                                <HistorysCreates />
                            </ContentCenter>
                        </ChartContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
