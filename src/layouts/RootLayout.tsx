import { Box, Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { AsideBar } from '~/components/AsideBar/AsideBar';
import { FooterMobile } from '~/components/FooterMobile/FooterMobile';
import { Header } from '~/components/Header/Header';
import { Sidebar } from '~/components/Sidebar/Sidebar';

export default function RootLayout() {
    const { isOpen: openBurger, onToggle, onClose } = useDisclosure();
    const [isDesktop] = useMediaQuery(`(min-width: 1024px)`);

    useEffect(() => {
        if (isDesktop) {
            onClose();
        }
    }, [isDesktop, onClose]);

    return (
        <Box display='flex' flexDirection='column'>
            <Header openBurger={openBurger} onToggle={onToggle} />
            <Flex>
                {isDesktop ? (
                    <Sidebar />
                ) : (
                    openBurger && <Sidebar openBurger={openBurger} onClose={onClose} />
                )}
                <Box
                    flex='1'
                    filter={openBurger ? 'blur(4px)' : 'none'}
                    transition='filter 0.2s ease-out'
                    bg={openBurger ? 'rgba(0,0,0,0.1)' : 'transparent'}
                    position='relative'
                    onClick={() => onClose()}
                >
                    <Outlet />
                </Box>
                <AsideBar />
            </Flex>
            <Box display={{ base: 'flex', md: 'none' }} position='fixed'>
                <FooterMobile openBurger={openBurger} />
            </Box>
        </Box>
    );
}
