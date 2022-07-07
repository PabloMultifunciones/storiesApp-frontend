import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import { Chart, registerables } from 'chart.js';
import { getActions } from '../../actions/historyActions';

function ActionsLastDay(props?: any) {
    const [countActionCreate, setCountActionCreate] = useState(null);
    const [countActionUpdate, setCountActionUpdate] = useState(null);
    const [countActionDelete, setCountActionDelete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (registerables !== undefined) {
            Chart.register(...registerables);
        }
    });

    if (
        props?.countActionCreate !== null &&
        props?.countActionUpdate !== null &&
        props?.countActionDelete !== null &&
        loading
    ) {
        setCountActionCreate(props?.countActionCreate);
        setCountActionDelete(props?.countActionDelete);
        setCountActionUpdate(props?.countActionUpdate);
    }

    if (
        countActionCreate !== null &&
        countActionDelete !== null &&
        countActionUpdate !== null &&
        loading
    ) {
        setLoading(false);
    }

    if (loading) {
        props?.getActions();
    }

    const state = {
        labels: ['Acciones realizadas en el ultimo dia'],
        datasets: [
            {
                label: 'Crear',
                backgroundColor: '#4eea3e',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [countActionCreate],
            },
            {
                label: 'Actualizar',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [countActionUpdate],
            },
            {
                label: 'Eliminar',
                backgroundColor: '#f34d32',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [countActionDelete],
            },
        ],
    };

    const options: any = {
        title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20,
        },
        legend: {
            display: true,
            position: 'right',
        },
    };
    return (
        <>
            {loading ? (
                <ClipLoader color='blue' size={120} />
            ) : (
                <Bar
                    data={state}
                    options={options}
                    data-testid='chart-actions-last-day'
                />
            )}
        </>
    );
}

const mapDispatchToProps = { getActions };

const mapStateToProps = (props: any) => props.historyReducer;

export default connect(mapStateToProps, mapDispatchToProps)(ActionsLastDay);
