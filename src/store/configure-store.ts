import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { recipeApi } from '~/query/services/recipe-api';

import { apiSlice } from './../query/create-api';
import { categoryApi } from './../query/services/category-api';
import appReducer, { appSlice } from './app-slice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            categoryApi.middleware,
            recipeApi.middleware,
        ),
    devTools: !isProduction,
});
