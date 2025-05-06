import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { CategoryPage } from '~/components/CategoryPage/CategoryPage';
import { TabComponent } from '~/components/CategoryPage/TabComponent/TabComponent';
import { Juiciest } from '~/components/Juiciest/Juiciest';
import { Main } from '~/components/Main/Main';
import { NotFound } from '~/components/NotFound/NotFound';
import RootLayout from '~/layouts/RootLayout';

import { RecipePage } from '../components/RecipesPage/RecipesPage';
import theme from './../theme';

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <Routes>
                    <Route path='/' element={<RootLayout />}>
                        <Route index element={<Main />} />
                        <Route path='the-juiciest'>
                            <Route index element={<Juiciest />} />
                        </Route>

                        <Route path=':category' element={<CategoryPage />}>
                            <Route index element={<TabComponent />} />
                            <Route path=':subcategory' element={<TabComponent />} />
                        </Route>

                        <Route path=':category/:subcategory/:id' element={<RecipePage />} />
                    </Route>
                    <Route path='/not-found' element={<NotFound />} />
                </Routes>
            </ChakraProvider>
        </>
    );
}

export default App;
