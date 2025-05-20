import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Forgot from '~/assets/Forgot.jpg';
import Pin from '~/assets/pin.jpg';
import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { useForgotPasswordMutation } from '~/query/services/auth-api';
import { ApplicationState } from '~/store/configure-store';

import { Code } from './Code/Code';
import { Reset } from './Reset/Reset';

type ForgotPasswordProps = {
    setSuccess: (value: 'email' | 'reset' | null) => void;
};

type FormData = {
    email: string;
};

export const ForgotPassword = ({ setSuccess }: ForgotPasswordProps) => {
    const isLoading = useSelector((state: ApplicationState) => state.app.isLoading);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
    const [forgotError, setForgotError] = useState<{
        title: string;
        message: string;
    } | null>(null);
    const [forgotPassword, { error }] = useForgotPasswordMutation();

    const {
        handleSubmit: handleSubmitForgot,
        register: registerForgot,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (values: FormData) => {
        const response = await forgotPassword(values);
        if (response.data) {
            setStep('code');
        }
    };

    useEffect(() => {
        if (error) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 403) {
                setForgotError({
                    title: 'Такого e-mail нет',
                    message: 'Попробуйте другой e-mail или проверьте правильность его написания',
                });
                reset();
            }
            if (error && typeof error === 'object' && 'status' in error && error.status === 500) {
                setForgotError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже',
                });
                reset();
            }
        }
    }, [error, onOpen, reset]);

    const handleCloseButton = () => {
        reset();
        setStep('email');
    };

    return (
        <Flex>
            {forgotError && (
                <ErrorNotification error={forgotError.message} title={forgotError.title} />
            )}
            <Text fontWeight='600' fontSize='16px' lineHeight='150%' mt='16px'>
                <Button
                    data-test-id='forgot-password'
                    bg='transparent'
                    p='0'
                    _hover={{ bg: 'transparent' }}
                    onClick={onOpen}
                >
                    Забыли логин или пароль?
                </Button>
            </Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay p='0' />
                <ModalContent
                    data-test-id={
                        step === 'email'
                            ? 'send-email-modal'
                            : step === 'code'
                              ? 'verification-code-modal'
                              : 'reset-credentials-modal'
                    }
                    borderRadius='16px'
                    w={{ md: '396px', base: '316px' }}
                    p='0'
                    filter={isLoading ? 'blur(2px)' : 'none'}
                    transition='filter 0.2s ease-out'
                >
                    <ModalCloseButton
                        data-test-id='close-button'
                        border='2px solid black'
                        borderRadius='50%'
                        w='24px'
                        h='24px'
                        mt='16px'
                        mr='12px'
                        onClick={handleCloseButton}
                    />
                    <Flex direction='column' align='center'>
                        {step !== 'reset' && (
                            <Image
                                src={step === 'email' ? Forgot : Pin}
                                w={{ md: '206px', base: '108px' }}
                                h={{ md: '206px', base: '108px' }}
                                mt='32px'
                            />
                        )}
                        <Box w={{ md: '332px', base: '270px' }}>
                            <ModalHeader p='0' m={{ md: '32px 32px 0 32px', base: '32px 0 0 0' }}>
                                {(step === 'email' && (
                                    <Text
                                        fontWeight='400'
                                        fontSize='16px'
                                        lineHeight='150%'
                                        textAlign='center'
                                    >
                                        Для восстановления входа введите ваш e-mail, куда можно
                                        отправить уникальный код
                                    </Text>
                                )) ||
                                    (step === 'code' && (
                                        <Text
                                            fontWeight='400'
                                            fontSize='16px'
                                            lineHeight='150%'
                                            textAlign='center'
                                        >
                                            Мы отправили вам на e-mail {getValues('email')}
                                            шестизначный код. Введите его ниже.
                                        </Text>
                                    )) ||
                                    (step === 'reset' && (
                                        <Text
                                            fontWeight='700'
                                            fontSize='24px'
                                            lineHeight='133%'
                                            textAlign='center'
                                        >
                                            Восстановление <br /> аккаунта
                                        </Text>
                                    ))}
                            </ModalHeader>
                            <ModalBody m={{ md: '16px 32px 0 32px', base: '16px 0 0 0' }} p='0'>
                                {(step === 'email' && (
                                    <>
                                        <form onSubmit={handleSubmitForgot(onSubmit)}>
                                            <FormControl isInvalid={!!errors.email} mt='20px'>
                                                <FormLabel
                                                    htmlFor='email'
                                                    fontWeight='400'
                                                    fontSize='16px'
                                                    lineHeight='150%'
                                                >
                                                    Ваш e-mail
                                                </FormLabel>
                                                <Input
                                                    data-test-id='email-input'
                                                    id='email'
                                                    placeholder='e-mail'
                                                    {...registerForgot('email', {
                                                        required: 'Введите e-mail',
                                                        maxLength: {
                                                            value: 50,
                                                            message:
                                                                'Максимальная длина 50 символов',
                                                        },
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                            message: 'Введите корректный e-mail',
                                                        },
                                                    })}
                                                    onBlur={(e) => {
                                                        const trimmed = e.target.value.trim();
                                                        setValue('email', trimmed, {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        });
                                                    }}
                                                    border='1px solid #d7ff94'
                                                    borderRadius='6px'
                                                    p='0 16px'
                                                    w='100%'
                                                    h='48px'
                                                    bg='#fff'
                                                    fontWeight='400'
                                                    fontSize='18px'
                                                    color='#134b00'
                                                    _placeholder={{
                                                        fontWeight: '400',
                                                        fontSize: '18px',
                                                        color: '#134b00',
                                                    }}
                                                />
                                                <FormErrorMessage>
                                                    {errors.email && errors.email.message}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <Button
                                                data-test-id='submit-button'
                                                type='submit'
                                                mt='24px'
                                                w='100%'
                                                bg='rgba(0, 0, 0, 0.92)'
                                                borderRadius='6px'
                                                h='48px'
                                                _hover={{ bg: 'rgba(0, 0, 0, 0.92)' }}
                                                color='#fff'
                                                fontWeight='600'
                                                fontSize='18px'
                                                lineHeight='156%'
                                            >
                                                Получить код
                                            </Button>
                                        </form>
                                    </>
                                )) ||
                                    (step === 'code' && (
                                        <Code email={getValues('email')} setStep={setStep} />
                                    )) ||
                                    (step === 'reset' && (
                                        <Reset
                                            email={getValues('email')}
                                            setSuccess={setSuccess}
                                            onClose={onClose}
                                        />
                                    ))}
                            </ModalBody>
                        </Box>

                        {step !== 'reset' && (
                            <ModalFooter
                                display='flex'
                                p='0'
                                m='24px 32px 32px 32px'
                                fontWeight='400'
                                fontSize='12px'
                                lineHeight='133%'
                                color='rgba(0, 0, 0, 0.48)'
                                textAlign='center'
                            >
                                Не пришло письмо? Проверьте папку Спам.
                            </ModalFooter>
                        )}
                    </Flex>
                </ModalContent>
            </Modal>
        </Flex>
    );
};
