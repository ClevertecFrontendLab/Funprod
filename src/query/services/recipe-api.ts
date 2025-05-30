import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from './baseQueryWithAuth';
import {
    CreateRecipe,
    Data,
    GetRecipesById,
    GetRecipesParams,
    GetRecipesQueryArgs,
    MeasureUnitsResponse,
    Recipe,
} from './recipe-api.type';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Recipe'],
    endpoints: (builder) => ({
        getRecipes: builder.query<Recipe, Partial<GetRecipesQueryArgs>>({
            query: (params) => ({
                url: 'recipe',
                method: 'GET',
                params,
            }),
            providesTags: [{ type: 'Recipe' }],
            transformResponse: (response: Recipe) => {
                try {
                    localStorage.setItem('cachedRecipe', JSON.stringify(response));
                } catch (e) {
                    console.warn('Failed to cache recipe', e);
                }
                return response;
            },
        }),
        getRecipesCategory: builder.query<Recipe, GetRecipesParams>({
            query: (params) => ({
                url: `recipe/category/${params.id}`,
                method: 'GET',
                params,
            }),
            transformResponse: (response: Recipe) => {
                try {
                    localStorage.setItem('cachedRecipeCategory', JSON.stringify(response));
                } catch (e) {
                    console.warn('Failed to cache recipe', e);
                }
                return response;
            },
        }),
        getRecipeById: builder.query<Data, GetRecipesById>({
            query: ({ id }) => ({
                url: `recipe/${id}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Recipe' }],
        }),
        createRecipe: builder.mutation<Data, CreateRecipe>({
            query: (body) => ({
                url: 'recipe',
                method: 'POST',
                body,
            }),
        }),
        createDraftRecipe: builder.mutation<Data, CreateRecipe>({
            query: (body) => ({
                url: 'recipe/draft',
                method: 'POST',
                body,
            }),
        }),
        measureUnits: builder.query<MeasureUnitsResponse[], void>({
            query: () => ({
                url: 'measure-units',
                method: 'GET',
            }),
        }),
        likeRecipe: builder.mutation<Data, string>({
            query: (id) => ({
                url: `recipe/${id}/like`,
                method: 'POST',
            }),
        }),
        bookmarkRecipe: builder.mutation<Data, string>({
            query: (id) => ({
                url: `recipe/${id}/bookmark`,
                method: 'POST',
            }),
        }),
        editRecipe: builder.mutation<Data, { id: string; body: CreateRecipe }>({
            query: ({ id, body }) => ({
                url: `recipe/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [{ type: 'Recipe' }],
        }),
        deleteRecipe: builder.mutation<Data, string>({
            query: (id) => ({
                url: `recipe/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Recipe' }],
        }),
    }),
});

export const {
    useGetRecipesCategoryQuery,
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useCreateRecipeMutation,
    useCreateDraftRecipeMutation,
    useMeasureUnitsQuery,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
    useEditRecipeMutation,
    useDeleteRecipeMutation,
} = recipeApi;
