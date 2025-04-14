import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { Juiciest } from '~/components/Juiciest/Juiciest';
import { Main } from '~/components/Main/Main';
import { VeganCuisine } from '~/components/VeganCuisine/VeganCuisine';
import { SecondCourses } from '~/components/VeganCuisine/VeganSecond/VeganSecond';
import RootLayout from '~/layouts/RootLayout';

import theme from './../theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<Main />} />
                    <Route path='vegan-cuisine' element={<VeganCuisine />}>
                        <Route path='second-courses' element={<SecondCourses />} />
                    </Route>
                    <Route path='juiciest' element={<Juiciest />} />
                </Route>
            </Routes>
        </ChakraProvider>
    );
}

export default App;
