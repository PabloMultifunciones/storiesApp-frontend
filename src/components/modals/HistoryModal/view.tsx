import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ContentCenter } from '../../../styles/styled';
import { PropsView } from '../../../interfaces';
import { getHistoryRequest } from '../../../actions/historyActions';

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

function View(props?: PropsView) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            props?.getHistoryRequest(props?.id);
        }
    });

    useEffect(() => {
        setLoading(false);
    }, [props?.history]);

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
                            {props?.history?.title}
                        </Grid>
                    </LabelInput>
                    <LabelInput item xs={12}>
                        <Label item xs={4}>
                            <Typography>Descripcion</Typography>
                        </Label>
                        <Grid item xs={8}>
                            {props?.history?.description}
                        </Grid>
                    </LabelInput>
                </>
            )}
        </>
    );
}

const mapDispatchToProps = { getHistoryRequest };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(View);
