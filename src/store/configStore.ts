/* eslint-disable no-unused-vars */
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from '../reducers';

// eslint-disable-next-line no-use-before-define
export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: reducers,
        preloadedState,
        middleware: [thunk],
    });
}

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
