import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { Juiciest } from '~/components/Juiciest/Juiciest';
import { Main } from '~/components/Main/Main';
import { Snacks } from '~/components/VeganCuisine/Snacks/Snacks';
import { VeganCuisine } from '~/components/VeganCuisine/VeganCuisine';
import RootLayout from '~/layouts/RootLayout';

import { RecipePage } from '../components/RecipesPage/RecipesPage';
import theme from './../theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<Main />} />
                    <Route path='vegan' element={<VeganCuisine />}>
                        <Route path='snacks' element={<Snacks />} />
                        <Route path='first-dish' element={<div>first-dish</div>} />
                        <Route path='second-dish' element={<Snacks />} />
                        <Route path='side-dishes' element={<div>Гарниры</div>} />
                        <Route path='desserts' element={<div>desserts</div>} />
                        <Route path='baked-goods' element={<div>baked-goods</div>} />
                        <Route path='raw-dishes' element={<div>raw-dishes</div>} />
                        <Route path='drinks' element={<div>Напитки</div>} />
                    </Route>
                    <Route path=':category/:subcategory/:id' element={<RecipePage />} />
                    <Route path='/the-juiciest' element={<Juiciest />} />
                    <Route path='/juiciest' element={<Juiciest />} />
                </Route>
            </Routes>
        </ChakraProvider>
    );
}

export default App;
