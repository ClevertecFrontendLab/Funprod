import { Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { AsideBar } from '~/components/AsideBar/AsideBar';
import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { Footer } from '~/components/Footer/Footer';
import { FooterMobile } from '~/components/FooterMobile/FooterMobile';
import { FullPageLoader } from '~/components/FullPageLoader/FullPageLoader';
import { Header } from '~/components/Header/Header';
import { Sidebar } from '~/components/Sidebar/Sidebar';
import { useGetCategoriesQuery } from '~/query/services/category-api/category-api';
import {
    setAppError,
    userErrorSelector,
    userLoadingSelector,
    userSuccessSelector,
} from '~/store/app-slice';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';

export default function RootLayout() {
    const { isOpen: openBurger, onToggle, onClose } = useDisclosure();
    const [isDesktop] = useMediaQuery(`(min-width: 1024px)`);
    const isLoading = useSelector(userLoadingSelector);
    const error = useSelector(userErrorSelector);
    const success = useSelector(userSuccessSelector);
    const dispatch = useDispatch();
    const { data } = useGetCategoriesQuery();
    const filterCategory = useCategoriesWithSubcategories(data);

    useEffect(() => {
        if (data && data.length > 0) {
            localStorage.setItem('cachedCategories', JSON.stringify(data));
        }
    }, [data]);
    useEffect(() => {
        if (isDesktop) {
            onClose();
        }
    }, [isDesktop, onClose]);

    useEffect(() => {
        const sessionError = sessionStorage.getItem('error');
        if (sessionError) {
            dispatch(setAppError({ title: 'Ошибка сервера', message: sessionError }));
            sessionStorage.removeItem('error');
        }
    }, [dispatch]);

    return (
        <Flex direction='column' align='center' w='100%'>
            {isLoading && <FullPageLoader />}
            {(error || success) && (
                <ErrorNotification
                    title={error?.title || success?.title}
                    message={error?.message || success?.message}
                    success={success}
                />
            )}
            <Header openBurger={openBurger} onToggle={onToggle} />
            <Flex
                filter={isLoading ? 'blur(2px)' : 'none'}
                transition='filter 0.2s ease-out'
                maxW='1920px'
                w='100%'
                position='relative'
                minH='100vh'
            >
                {isDesktop ? (
                    <Sidebar />
                ) : (
                    openBurger && <Sidebar openBurger={openBurger} onClose={onClose} />
                )}
                {data && (
                    <Flex
                        direction='column'
                        align={{ sm: 'center', md: 'flex-start' }}
                        flex='1'
                        filter={openBurger ? 'blur(4px)' : 'none'}
                        transition='filter 0.2s ease-out'
                        bg={openBurger ? 'rgba(0,0,0,0.1)' : 'transparent'}
                        position='relative'
                        onClick={() => onClose()}
                        ml={{ base: 0, md: '256px' }}
                    >
                        <Outlet />
                        <Footer footerData={filterCategory} />
                    </Flex>
                )}
                <AsideBar />
            </Flex>
            <FooterMobile openBurger={openBurger} />
        </Flex>
    );
}
