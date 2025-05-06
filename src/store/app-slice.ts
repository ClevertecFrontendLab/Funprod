import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, categoryApi } from './../query/services/category-api';
import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    selectedCategoryId: localStorage.getItem('selectedCategoryId') || null,
    categories: [] as Category[],
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setSelectedCategoryId(state, { payload: categoryId }: PayloadAction<string | null>) {
            state.selectedCategoryId = categoryId;
            if (categoryId) {
                localStorage.setItem('selectedCategoryId', categoryId);
            } else {
                localStorage.removeItem('selectedCategoryId');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(categoryApi.endpoints.getCategories.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(
                categoryApi.endpoints.getCategories.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.categories = payload;
                    try {
                        localStorage.setItem('cachedCategories', JSON.stringify(payload));
                    } catch (e) {
                        console.warn('Failed to cache categories', e);
                    }
                },
            )
            .addMatcher(categoryApi.endpoints.getCategories.matchRejected, (state) => {
                state.isLoading = false;
            });
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const selectedCategoryIdSelector = (state: ApplicationState) => state.app.selectedCategoryId;
export const categoriesSelector = (state: ApplicationState) => state.app.categories;

export const { setAppError, setAppLoader, setSelectedCategoryId } = appSlice.actions;
export default appSlice.reducer;
