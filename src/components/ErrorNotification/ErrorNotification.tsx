import { Alert, AlertIcon, CloseButton, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAppError, userErrorSelector } from '~/store/app-slice';

type ErrorNotificationProps = {
    title?: string;
    error?: string;
    isAuthPage?: boolean;
};

export const ErrorNotification = ({ error, title, isAuthPage }: ErrorNotificationProps) => {
    const errorStatus = useSelector(userErrorSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorStatus) {
            const timer = setTimeout(() => {
                dispatch(setAppError(null));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [errorStatus, dispatch]);

    const handleClose = () => dispatch(setAppError(null));
    return (
        <Alert
            data-test-id='error-notification'
            status='error'
            position='fixed'
            bottom='20px'
            left={isAuthPage ? { md: '25%', base: '50%' } : '50%'}
            transform='translateX(-50%)'
            zIndex='toast'
            width='fit-content'
            w='332px'
            bg='#e53e3e'
        >
            <AlertIcon color='#fff' />
            <Flex direction='column'>
                <Text fontWeight='700' fontSize='16px' color='#fff' w='240px'>
                    {title}
                </Text>
                <Text fontWeight='400' fontSize='16px' color='#fff' w='240px'>
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
    );
};
