import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '~/query/baseQueryWithAuth';

type SubscriptionRequest = {
    toUserId: string;
    fromUserId: string;
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        subscription: builder.mutation<unknown, SubscriptionRequest>({
            query: (body) => ({
                url: 'users/toggle-subscription',
                method: 'PATCH',
                body,
            }),
        }),
    }),
});

export const { useSubscriptionMutation } = usersApi;
