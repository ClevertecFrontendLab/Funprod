import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../base-query';
import {
    Data,
    GetRecipesById,
    GetRecipesParams,
    GetRecipesQueryArgs,
    Recipe,
} from './recipe-api.type';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery,
    endpoints: (builder) => ({
        getRecipes: builder.query<Recipe, Partial<GetRecipesQueryArgs>>({
            query: (params) => ({
                url: 'recipe',
                method: 'GET',
                params,
            }),

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
        }),
    }),
});

export const { useGetRecipesCategoryQuery, useGetRecipesQuery, useGetRecipeByIdQuery } = recipeApi;
