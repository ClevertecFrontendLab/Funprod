import { Flex, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { useCheckVerificationCodeMutation } from '~/query/services/auth-api';
import { setAppLoader } from '~/store/app-slice';

type CodeProps = {
    email: string;
    setStep: (step: 'email' | 'code' | 'reset') => void;
};

export const Code = ({ email, setStep }: CodeProps) => {
    const [checkVerificationCode, { error, isLoading }] = useCheckVerificationCodeMutation();
    const [hasError, setHasError] = useState<boolean>(false);
    const [pinValue, setPinValue] = useState('');
    const [codeError, setCodeError] = useState<{
        title: string;
        message: string;
    } | null>(null);
    const dispatch = useDispatch();
    const onComplete = async (value: string) => {
        const response = await checkVerificationCode({ email, otpToken: value });
        if (response.data) {
            setStep('reset');
            dispatch(setAppLoader(false));
        }
        if (response.error) {
            setPinValue('');
            setHasError(true);
            dispatch(setAppLoader(false));
        }
    };

    const handleChange = (value: string) => {
        setPinValue(value);
        if (hasError) {
            setHasError(false);
        }
    };

    useEffect(() => {
        if (error) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 500) {
                setCodeError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже',
                });
            }
            const timer = setTimeout(() => {
                setCodeError(null);
                setHasError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
    }, [dispatch, isLoading]);

    return (
        <Flex direction='column' align='center'>
            {codeError && <ErrorNotification error={codeError.message} title={codeError.title} />}
            <HStack m={{ md: '0 32px', base: '0' }}>
                <PinInput
                    otp
                    size='md'
                    onComplete={onComplete}
                    isInvalid={hasError}
                    value={pinValue}
                    onChange={handleChange}
                >
                    <PinInputField data-test-id='verification-code-input-1' />
                    <PinInputField data-test-id='verification-code-input-2' />
                    <PinInputField data-test-id='verification-code-input-3' />
                    <PinInputField data-test-id='verification-code-input-4' />
                    <PinInputField data-test-id='verification-code-input-5' />
                    <PinInputField data-test-id='verification-code-input-6' />
                </PinInput>
            </HStack>
            {hasError && (
                <Text fontSize='12px' color='red' mt='8px'>
                    Неверный код
                </Text>
            )}
        </Flex>
    );
};
