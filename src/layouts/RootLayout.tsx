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
import { useRandomCategory } from '~/hooks/useRandomCategory';
import { categoriesSelector, setAppError, userErrorSelector } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';
import { getCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';

export default function RootLayout() {
    const { isOpen: openBurger, onToggle, onClose } = useDisclosure();
    const [isDesktop] = useMediaQuery(`(min-width: 1024px)`);
    const isLoading = useSelector((state: ApplicationState) => state.app.isLoading);
    const error = useSelector(userErrorSelector);
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);
    const filterCategory = getCategoriesWithSubcategories(categories);

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

    const randomCategory = useRandomCategory(filterCategory!);
    return (
        <Flex direction='column' align='center' w='100%'>
            {isLoading && <FullPageLoader />}
            {error && <ErrorNotification error={error.message} title={error.title} />}
            <Header openBurger={openBurger} onToggle={onToggle} />
            <Flex filter={isLoading ? 'blur(2px)' : 'none'} transition='filter 0.2s ease-out'>
                {isDesktop ? (
                    <Sidebar />
                ) : (
                    openBurger && <Sidebar openBurger={openBurger} onClose={onClose} />
                )}
                <Flex
                    direction='column'
                    flex='1'
                    filter={openBurger ? 'blur(4px)' : 'none'}
                    transition='filter 0.2s ease-out'
                    bg={openBurger ? 'rgba(0,0,0,0.1)' : 'transparent'}
                    position='relative'
                    onClick={() => onClose()}
                >
                    <Outlet />
                    <Footer footerData={randomCategory} />
                </Flex>
                <AsideBar />
            </Flex>
            <FooterMobile openBurger={openBurger} />
        </Flex>
    );
}
