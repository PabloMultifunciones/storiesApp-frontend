import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupStore } from '../store/configStore';

import type { AppStore, RootState } from '../store/configStore';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) {
    // eslint-disable-next-line no-undef
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
