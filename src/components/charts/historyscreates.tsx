import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ClipLoader from 'react-spinners/ClipLoader';
import { countCreateHistorysRequest } from '../../actions/historyActions';

interface dateProps {
    dateName: String;
    createdCount: Number;
}

function HistorysCreates(props: any) {
    const [labels, setLabels] = useState<Array<String>>([]);
    const [countHistorysCreates, setCountHistorysCreates] = useState<
        Array<Number>
    >([]);

    useEffect(() => {
        if (registerables !== undefined) {
            Chart.register(...registerables);
        }
    });

    if (props?.countHistorysCreates === null) {
        props.countCreateHistorysRequest();
    }

    if (props.countHistorysCreates !== null && labels.length === 0) {
        const labels: Array<String> = [];
        const countHistorysCreates: Array<Number> = [];
        props.countHistorysCreates.forEach((date: dateProps) => {
            labels.push(date.dateName);
            countHistorysCreates.push(date.createdCount);
        });
        setLabels(labels);
        setCountHistorysCreates(countHistorysCreates);
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Historias Creadas',
                data: countHistorysCreates,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                lineTension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                reverse: true,
            },
        },
    };
    return (
        <>
            {labels.length === 0 ? (
                <ClipLoader color='blue' size={120} />
            ) : (
                <Line
                    data={data}
                    options={options}
                    data-testid='chart-historys-creates'
                />
            )}
        </>
    );
}

const mapDispatchToProps = { countCreateHistorysRequest };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(HistorysCreates);
