import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../base-query';

export type Recipe = {
    data: Data[];
    meta: Meta;
};

export type Data = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    proteins: number;
    authorId: string;
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
};

export type Step = {
    stepNumber: number;
    description: string;
    image: string;
};

export type NutritionValue = {
    calories: number;
    proteins: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type GetRecipesQueryArgs = {
    page?: number;
    limit?: number;
    allergens?: string[];
    searchString?: string;
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type GetRecipesParams = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    id: string;
};
export type GetRecipesById = {
    id: string;
};

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery,
    endpoints: (builder) => ({
        getRecipes: builder.query<Recipe, GetRecipesQueryArgs>({
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
