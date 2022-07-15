import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';

const styleEjem = {
    backgroundColor: '#1C72E7',
    minHeight: '90vh',
    padding: '8px',
};

const ItemMenu = styled.div`
    ${(props: { selected: boolean }) =>
        props?.selected
            ? 'background-color: white; color: #1c72e7;'
            : 'background-color: #1c72e7; color: white;'};
    display: flex;
    font-weight: bold;
    border-style: solid;
    border-color: white;
    margin-bottom: 5px;
    border-radius: 6px;
    padding: 5px;
    transition: 0.3s;
    &: hover {
        background-color: white;
        color: #1c72e7;
    }
`;

const OptionName = styled(Typography)`
    margin-left: 5px !important;
    font-weight: bold !important;
`;

export default function Scrollbar(props: { page: string }) {
    return (
        <Grid container item xs={2} style={styleEjem}>
            <Grid item xs={12}>
                <Link to='/historys' style={{ textDecoration: 'none' }}>
                    <ItemMenu selected={props.page === 'historys'}>
                        <HistoryIcon />
                        <OptionName>Historias</OptionName>
                    </ItemMenu>
                </Link>
                <Link to='/charts' style={{ textDecoration: 'none' }}>
                    <ItemMenu selected={props.page === 'charts'}>
                        <AssessmentIcon />
                        <OptionName>Graficas</OptionName>
                    </ItemMenu>
                </Link>
            </Grid>
        </Grid>
    );
}
