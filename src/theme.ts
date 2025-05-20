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
    components: {
        Progress: {
            // Мы создаем новый кастомный вариант для Progress
            variants: {
                custom: {
                    // Цвет фона (track)
                    track: {
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    },
                    // Цвет самой полоски прогресса (filledTrack)
                    filledTrack: {
                        backgroundColor: '#c4ff61',
                    },
                },
            },
        },
    },
});

export default theme;
