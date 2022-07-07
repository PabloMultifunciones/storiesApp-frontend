import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../store/configStore';
import Charts from '../Charts';

describe('<Charts />', () => {
    let component: any;

    beforeEach(() => {
        const store = setupStore();
        store.dispatch({
            type: 'SAVE_COUNT_HISTORYS_A_I',
            payload: {
                historysActivies: 1,
                historysInactivies: 1,
            },
        });
        store.dispatch({
            type: 'SAVE_COUNT_ACTIONS_LAST_DAY',
            payload: {
                actionsAmounts: {
                    createdCount: 1,
                    updatedCount: 1,
                    deletedCount: 1,
                },
            },
        });
        store.dispatch({
            type: 'SAVE_COUNT_HISTORYS_CREATES',
            payload: {
                dates: [
                    { dateName: 'lunes', createdCount: 0 },
                    { dateName: 'domingo', createdCount: 0 },
                    { dateName: 'sábado', createdCount: 0 },
                    { dateName: 'viernes', createdCount: 0 },
                    { dateName: 'jueves', createdCount: 0 },
                    { dateName: 'miércoles', createdCount: 0 },
                    { dateName: 'martes', createdCount: 0 },
                ],
            },
        });
        component = renderWithProviders(<Charts />, { store });
    });

    test('The charts have been rendered succesfully', () => {
        component.getByTestId('chart-history-activies');
        component.getByTestId('chart-actions-last-day');
        component.getByTestId('chart-historys-creates');
    });
});
