/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import Historys from '../Historys';
import { setupStore } from '../../store/configStore';
import { IHistory } from '../../interfaces';

interface componentRender {
    getByText: (selector: string) => Element | null;
    getByTestId: (selector: string) => Element | null;
    queryByText: (selector: string) => Element | null;
}

describe('<Historys />', () => {
    let component: componentRender;

    const HISTORY_EXAMPLE: IHistory = {
        _id: 'idexampleid',
        title: 'title example',
        description: 'description example',
    };

    beforeEach(() => {
        // eslint-disable-next-line no-undef
        const store = setupStore();
        store.dispatch({
            type: 'ADD_HISTORY',
            payload: HISTORY_EXAMPLE,
        });

        component = renderWithProviders(<Historys />, { store });
    });

    test('The Menu options is rendered correctly', () => {
        component.getByText('Historias');
        component.getByText('Graficas');
    });

    test('When the button add history is clicked, show the modal to add a new history', () => {
        const buttonAdd: any = component.getByTestId('btn-add-history');
        fireEvent.click(buttonAdd);
        component.getByText('Historia Nueva');
        component.getByText('Titulo');
        component.getByText('Descripcion');
    });

    test('When the button close is clicked the modal is closed', async () => {
        const buttonAdd: any = component.getByTestId('btn-add-history');
        fireEvent.click(buttonAdd);
        component.getByText('Historia Nueva');
        const buttonClose: any = component.getByText('x');
        fireEvent.click(buttonClose);
        expect(component.queryByText('Historia Nueva')).toBeNull();
    });

    test('When one history is added, it is save succesfully', () => {
        component.getByText(HISTORY_EXAMPLE.title);
        component.getByText(HISTORY_EXAMPLE.description);
    });

    test('When the button edit history is clicked, show the modal to edit the history', () => {
        const buttonEdit: any = component.getByTestId('EditIcon');
        fireEvent.click(buttonEdit);
        component.getByText('Editar Historia');
    });

    test('When the button view history es clicked, show the modal to view the history', () => {
        const buttonView: any = component.getByText('Ver');
        fireEvent.click(buttonView);
        component.getByText('Ver Historia');
    });
});
