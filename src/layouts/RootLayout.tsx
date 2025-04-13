import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { AsideBar } from '~/components/AsideBar/AsideBar';
import { FooterMobile } from '~/components/FooterMobile/FooterMobile';
import { Header } from '~/components/Header/Header';
import { Sidebar } from '~/components/Sidebar/Sidebar';

export default function RootLayout() {
    return (
        <Box display='flex' flexDirection='column'>
            <Header />
            <Flex>
                <Sidebar />
                <Outlet />
                <AsideBar />
            </Flex>
            <Box display={{ base: 'block', md: 'none' }}>
                <FooterMobile />
            </Box>
        </Box>
    );
}
