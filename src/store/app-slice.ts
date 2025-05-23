import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '~/query/services/auth-api';
import { Category } from '~/query/services/category-api.type';
import { recipeApi } from '~/query/services/recipe-api';

import { categoryApi } from './../query/services/category-api';
import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: null as { title: string; message: string } | null,
    selectedCategoryId: localStorage.getItem('selectedCategoryId') || null,
    categories: [] as Category[],
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(
            state,
            { payload: error }: PayloadAction<{ title: string; message: string } | null>,
        ) {
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
        setCategories(state, { payload }: PayloadAction<Category[]>) {
            state.categories = payload;
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
            })
            .addMatcher(recipeApi.endpoints.getRecipesCategory.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(recipeApi.endpoints.getRecipesCategory.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(recipeApi.endpoints.getRecipesCategory.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(authApi.endpoints.login.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.isLoading = false;
            });
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const selectedCategoryIdSelector = (state: ApplicationState) => state.app.selectedCategoryId;
export const categoriesSelector = (state: ApplicationState) => state.app.categories;

export const { setAppError, setAppLoader, setSelectedCategoryId, setCategories } = appSlice.actions;
export default appSlice.reducer;
