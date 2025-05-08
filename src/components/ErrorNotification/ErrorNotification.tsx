import { Alert, AlertIcon, CloseButton, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAppError } from '~/store/app-slice';

type ErrorNotificationProps = {
    error: string;
};

export const ErrorNotification = ({ error }: ErrorNotificationProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setAppError(null));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleClose = () => dispatch(setAppError(null));
    return (
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
    );
};
