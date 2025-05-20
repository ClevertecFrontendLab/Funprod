import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { useResetPasswordMutation } from '~/query/services/auth-api';
import { setAppError, setAppLoader } from '~/store/app-slice';

type FormData = {
    login: string;
    password: string;
    passwordConfirm: string;
};

type ResetProps = {
    email: string;
    setSuccess: (value: 'email' | 'reset' | null) => void;
    onClose: () => void;
};
export const Reset = ({ setSuccess, onClose, email }: ResetProps) => {
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetError, setResetError] = useState<{
        title: string;
        message: string;
    } | null>(null);

    const [reset, { error, isLoading }] = useResetPasswordMutation();

    const onSubmit = async (values: FormData) => {
        const trimmed = {
            login: values.login.trim(),
            password: values.password.trim(),
            passwordConfirm: values.passwordConfirm.trim(),
        };

        const response = await reset({ email, ...trimmed });
        if (response.data) {
            setSuccess('reset');
            onClose();
            dispatch(setAppLoader(false));
        }
        if (response.error) {
            dispatch(setAppError({ title: 'Ошибка сервера', message: 'Попробуйте немного позже' }));
            dispatch(setAppLoader(false));
        }
    };

    useEffect(() => {
        if (error) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 500) {
                setResetError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже',
                });
            }
            const timer = setTimeout(() => {
                setResetError(null);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            {resetError && (
                <ErrorNotification error={resetError.message} title={resetError.title} />
            )}
            <FormControl isInvalid={!!errors.login}>
                <FormLabel htmlFor='login' fontWeight='400' fontSize='16px' lineHeight='150%'>
                    Логин для входа на сайт
                </FormLabel>
                <Input
                    data-test-id='login-input'
                    id='login'
                    placeholder='Логин'
                    {...register('login', {
                        required: 'Введите логин',
                        minLength: {
                            value: 5,
                            message: 'Не соответствует формату',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50 символов',
                        },
                        pattern: {
                            value: /^[a-zA-Zа0-9!@#$&_+\-.]*$/,
                            message: 'Не соответствует формату',
                        },
                    })}
                    onBlur={(e) => {
                        const trimmed = e.target.value.trim();
                        setValue('login', trimmed, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    onChange={(e) => {
                        setValue('login', e.target.value, {
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
                <FormHelperText
                    color='rgba(0, 0, 0, 0.64)'
                    fontSize='12px'
                    fontWeight='400'
                    lineHeight='133%'
                >
                    Логин не менее 5 символов, только латиница и !@#$&_+-.
                </FormHelperText>
                <FormErrorMessage>{errors.login && errors.login.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password} mt='20px'>
                <FormLabel htmlFor='password' fontWeight='400' fontSize='16px' lineHeight='150%'>
                    Пароль
                </FormLabel>
                <Input
                    data-test-id='password-input'
                    id='password'
                    placeholder='Пароль для сайта'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 8,
                            message: 'Не соответствует формату',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50 символов',
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+\-.]{8,50}$/,
                            message: 'Не соответствует формату',
                        },
                    })}
                    onChange={(e) => {
                        setValue('password', e.target.value, {
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
                <FormHelperText
                    color='rgba(0, 0, 0, 0.64)'
                    fontSize='12px'
                    fontWeight='400'
                    lineHeight='133%'
                >
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </FormHelperText>

                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                <IconButton
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    icon={
                        showPassword ? (
                            <ViewIcon w='18px' h='18px' />
                        ) : (
                            <ViewOffIcon w='18px' h='18px' />
                        )
                    }
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    variant='link'
                    position='absolute'
                    right='14px'
                    top='38px'
                    transform='translateY(50%)'
                    zIndex='1'
                    color='#000'
                />
            </FormControl>
            <FormControl isInvalid={!!errors.passwordConfirm} mt='20px'>
                <FormLabel
                    htmlFor='confirmPassword'
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='150%'
                >
                    Повторите пароль
                </FormLabel>
                <Input
                    data-test-id='confirm-password-input'
                    id='confirmPassword'
                    placeholder='Повторите пароль'
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('passwordConfirm', {
                        required: 'Повторите пароль',
                        validate: (value) =>
                            value === watch('password') || 'Пароли должны совпадать',
                    })}
                    onChange={(e) => {
                        setValue('passwordConfirm', e.target.value, {
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
                    {errors.passwordConfirm && errors.passwordConfirm.message}
                </FormErrorMessage>

                <IconButton
                    aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    icon={
                        showConfirmPassword ? (
                            <ViewIcon w='18px' h='18px' />
                        ) : (
                            <ViewOffIcon w='18px' h='18px' />
                        )
                    }
                    onMouseDown={() => setShowConfirmPassword(true)}
                    onMouseUp={() => setShowConfirmPassword(false)}
                    onMouseLeave={() => setShowConfirmPassword(false)}
                    variant='link'
                    position='absolute'
                    right='14px'
                    top='38px'
                    transform='translateY(50%)'
                    zIndex='1'
                    color='#000'
                />
            </FormControl>
            <Button
                data-test-id='submit-button'
                colorScheme='teal'
                isLoading={isSubmitting}
                type='submit'
                w='100%'
                h='48px'
                mt='42px'
                mb='42px'
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                bg='rgba(0, 0, 0, 0.92)'
                _hover={{
                    bg: 'rgba(0, 0, 0, 0.7)',
                }}
            >
                Зарегистрироваться
            </Button>
        </form>
    );
};
