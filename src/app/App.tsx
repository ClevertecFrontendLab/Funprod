import { ChakraProvider } from '@chakra-ui/react';
import { useRoutes } from 'react-router';

import { routes } from '~/routes/routes';

import theme from './../theme';

function App() {
    const routing = useRoutes(routes);

    return (
        <>
            <ChakraProvider theme={theme}>{routing}</ChakraProvider>
        </>
    );
}

export default App;
