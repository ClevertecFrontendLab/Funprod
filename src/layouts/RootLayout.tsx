import {
    Alert,
    AlertIcon,
    Box,
    CloseButton,
    Flex,
    Text,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { AsideBar } from '~/components/AsideBar/AsideBar';
import { FooterMobile } from '~/components/FooterMobile/FooterMobile';
import { FullPageLoader } from '~/components/FullPageLoader/FullPageLoader';
import { Header } from '~/components/Header/Header';
import { Sidebar } from '~/components/Sidebar/Sidebar';
import { setAppError, userErrorSelector } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';

export default function RootLayout() {
    const { isOpen: openBurger, onToggle, onClose } = useDisclosure();
    const [isDesktop] = useMediaQuery(`(min-width: 1024px)`);
    const isLoading = useSelector((state: ApplicationState) => state.app.isLoading);
    const error = useSelector(userErrorSelector);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(setAppError(null));

    useEffect(() => {
        if (isDesktop) {
            onClose();
        }
    }, [isDesktop, onClose]);

    useEffect(() => {
        const sessionError = sessionStorage.getItem('error');
        if (sessionError) {
            dispatch(setAppError(sessionError));
            sessionStorage.removeItem('error');
        }
    }, [dispatch]);
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setAppError(null));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    return (
        <Box display='flex' flexDirection='column'>
            {isLoading && <FullPageLoader />}
            {error && (
                <Alert
                    data-test-id='error-notification'
                    status='error'
                    position='fixed'
                    bottom='20px'
                    left='50%'
                    transform='translateX(-50%)'
                    zIndex='toast'
                    width='fit-content'
                    w='332px'
                    h='72px'
                    bg='#e53e3e'
                >
                    <AlertIcon color='#fff' />
                    <Flex direction='column'>
                        <Text fontWeight='700' fontSize='16px' color='#fff'>
                            Ошибка сервера
                        </Text>
                        <Text fontWeight='400' fontSize='16px' color='#fff'>
                            {error}
                        </Text>
                    </Flex>
                    <CloseButton
                        data-test-id='close-alert-button'
                        position='absolute'
                        right='12px'
                        top='12px'
                        onClick={handleClose}
                        color='#fff'
                        w='12px'
                        h='12px'
                    />
                </Alert>
            )}
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
