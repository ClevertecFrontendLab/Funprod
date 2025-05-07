import { RouteObject } from 'react-router';

import { CategoryPage } from '~/components/CategoryPage/CategoryPage';
import { TabComponent } from '~/components/CategoryPage/TabComponent/TabComponent';
import { Juiciest } from '~/components/Juiciest/Juiciest';
import { Main } from '~/components/Main/Main';
import { NotFound } from '~/components/NotFound/NotFound';
import { RecipePage } from '~/components/RecipesPage/RecipesPage';
import RootLayout from '~/layouts/RootLayout';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Main /> },
            {
                path: 'the-juiciest',
                children: [{ index: true, element: <Juiciest /> }],
            },
            {
                path: ':category',
                element: <CategoryPage />,
                children: [
                    { index: true, element: <TabComponent /> },
                    { path: ':subcategory', element: <TabComponent /> },
                ],
            },
            {
                path: ':category/:subcategory/:id',
                element: <RecipePage />,
            },
        ],
    },
    { path: '/not-found', element: <NotFound /> },
];
