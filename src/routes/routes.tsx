import { RouteObject } from 'react-router';

import { Auth } from '~/components/auth/Auth';
import { Login } from '~/components/auth/Login/Login';
import { Registration } from '~/components/auth/Registration/Registration';
import { Blogger } from '~/components/Blogs/Blogger/Blogger';
import { Blogs } from '~/components/Blogs/Blogs';
import { CategoryPage } from '~/components/CategoryPage/CategoryPage';
import { TabComponent } from '~/components/CategoryPage/TabComponent/TabComponent';
import { Juiciest } from '~/components/Juiciest/Juiciest';
import { Main } from '~/components/Main/Main';
import { NewRecipe } from '~/components/NewRecipe/NewRecipe';
import { NotFound } from '~/components/NotFound/NotFound';
import { RecipePage } from '~/components/RecipesPage/RecipesPage';
import { ROUTES } from '~/constants/routes';
import RootLayout from '~/layouts/RootLayout';

import { PrivateRoute } from './PrivateRoute';

export const routes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: (
            <PrivateRoute>
                <RootLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <Main /> },
            {
                path: ROUTES.JUICIEST,
                children: [{ index: true, element: <Juiciest /> }],
            },
            {
                path: ROUTES.CATEGORY,
                element: <CategoryPage />,
                children: [
                    { index: true, element: <TabComponent /> },
                    { path: ROUTES.SUBCATEGORY, element: <TabComponent /> },
                ],
            },
            {
                path: `${ROUTES.CATEGORY}/${ROUTES.SUBCATEGORY}/${ROUTES.RECIPE_ID}`,
                element: <RecipePage />,
            },
            {
                path: ROUTES.NEW_RECIPE,
                element: <NewRecipe />,
            },
            {
                path: `${ROUTES.EDIT_RECIPE}/${ROUTES.CATEGORY}/${ROUTES.SUBCATEGORY}/${ROUTES.RECIPE_ID}`,
                element: <RecipePage />,
            },
            {
                path: ROUTES.BLOGS,
                element: <Blogs />,
            },
            {
                path: `${ROUTES.BLOGS}/${ROUTES.USER_ID}`,
                element: <Blogger />,
            },
        ],
    },
    { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    {
        path: ROUTES.AUTH,
        element: <Auth />,
        children: [
            { index: true, element: <Login /> },
            {
                path: ROUTES.REGISTRATION,
                element: <Registration />,
            },
        ],
    },
    { path: ROUTES.VERIFICATION, element: <Auth /> },
];
