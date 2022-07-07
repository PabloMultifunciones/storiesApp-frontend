import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ClipLoader from 'react-spinners/ClipLoader';
import { getHistorysAI } from '../../actions/historyActions';

function HistorysActivies(props: any) {
    const [historysActivies, setHistorysActivies] = useState(null);
    const [historysInactivies, setHistorysInactivies] = useState(null);

    useEffect(() => {
        if (registerables !== undefined) {
            Chart.register(...registerables);
        }
    });

    if (
        props?.countHistorysActivies === null &&
        props?.countHistorysInactivies === null
    ) {
        props?.getHistorysAI();
    }

    if (props?.countHistorysActivies !== null && historysActivies === null) {
        setHistorysActivies(props?.countHistorysActivies);
        setHistorysInactivies(props?.countHistorysInactivies);
    }
    const data = {
        labels: ['Historias Activas', 'Historias Inactivas'],
        datasets: [
            {
                data: [historysActivies, historysInactivies],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            {historysActivies === null && historysInactivies === null ? (
                <ClipLoader color='blue' size={120} />
            ) : (
                <Pie data={data} data-testid='chart-history-activies' />
            )}
        </>
    );
}

const mapDispatchToProps = { getHistorysAI };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(HistorysActivies);
