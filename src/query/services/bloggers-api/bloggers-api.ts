import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '~/query/baseQueryWithAuth';
import { Tags } from '~/query/constants/tags';

import {
    GetBloggerByIdRequest,
    GetBloggerByIdResponse,
    GetBloggersRequest,
    GetBloggersResponse,
} from './bloggers-api.type';

export const bloggersApi = createApi({
    reducerPath: 'bloggersApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [Tags.BLOGGERS],
    endpoints: (builder) => ({
        getBloggers: builder.query<GetBloggersResponse, GetBloggersRequest>({
            query: (params) => ({
                url: 'bloggers',
                method: 'GET',
                params,
            }),
        }),
        getBloggerById: builder.query<GetBloggerByIdResponse, GetBloggerByIdRequest>({
            query: ({ bloggerId, currentUserId }) => ({
                url: `bloggers/${bloggerId}`,
                method: 'GET',
                params: { currentUserId },
            }),
        }),
    }),
});

export const { useGetBloggersQuery, useGetBloggerByIdQuery } = bloggersApi;
