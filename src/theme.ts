import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    breakpoints: {
        base: '0px',
        sm: '450px',
        md: '1025px',
        lg: '1441px',
        xl: '1920px',
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
    },
});

export default theme;
