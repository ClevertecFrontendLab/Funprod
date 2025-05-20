import {
    Box,
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import forgot from '~/assets/Forgot.jpg';
import success from '~/assets/notSuccess.jpg';
import reg from '~/assets/register.jpg';

import { FormData } from './Registration';

type ModalComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    authModal: 'sendEmail' | 'notSuccess' | 'Health';
    formData: Partial<FormData>;
    setRepeatLogin?: (value: boolean) => void;
};

export const ModalComponent = ({
    isOpen,
    onClose,
    formData,
    authModal,
    setRepeatLogin,
}: ModalComponentProps) => (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay p='0' />
            <ModalContent
                data-test-id={
                    authModal === 'Health'
                        ? 'sign-in-error-modal'
                        : authModal === 'sendEmail'
                          ? 'sign-up-success-modal'
                          : authModal === 'notSuccess'
                            ? 'email-verification-failed-modal'
                            : ''
                }
                borderRadius='16px'
                w={{ md: '396px', base: '316px' }}
                h={
                    (authModal === 'notSuccess' && { md: '470px', base: '410px' }) ||
                    (authModal === 'sendEmail' && '550px') || { md: '478px', base: '380px' }
                }
                p='0'
            >
                <ModalCloseButton
                    data-test-id='close-button'
                    border='2px solid black'
                    borderRadius='50%'
                    w='24px'
                    h='24px'
                    mt='16px'
                    mr='12px'
                />
                <Flex direction='column' align='center' gap='32px'>
                    <Image
                        src={
                            (authModal === 'notSuccess' && success) ||
                            (authModal === 'sendEmail' && reg) ||
                            forgot
                        }
                        w={{ md: '206px', base: '108px' }}
                        h={{ md: '206px', base: '108px' }}
                        mt='32px'
                    />
                    <Box>
                        <ModalHeader
                            fontWeight='700'
                            fontSize='24px'
                            lineHeight='133%'
                            textAlign='center'
                            m='0 32px'
                            p='0'
                        >
                            {(authModal === 'notSuccess' && ` Упс! Что-то пошло не так`) ||
                                (authModal === 'sendEmail' &&
                                    `Остался последний шаг. Нужно верифицировать ваш e-mail`) ||
                                'Вход не выполнен'}
                        </ModalHeader>
                        <ModalBody m='16px 32px 0 32px' p='0'>
                            <Text
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='150%'
                                textAlign='center'
                                color='rgba(0, 0, 0, 0.92)'
                            >
                                {(authModal === 'notSuccess' &&
                                    `Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.`) ||
                                    (authModal === 'sendEmail' && (
                                        <>
                                            Мы отправили вам на почту <b>{formData?.email}</b>{' '}
                                            <br />
                                            ссылку для верификации.
                                        </>
                                    )) ||
                                    'Что-то пошло не так. Попробуйте еще раз'}
                            </Text>
                        </ModalBody>
                    </Box>

                    <ModalFooter
                        display='flex'
                        p='0'
                        m='0 32px'
                        fontWeight='400'
                        fontSize='12px'
                        lineHeight='133%'
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign='center'
                    >
                        {(authModal === 'notSuccess' && (
                            <>Остались вопросы? Свяжитесь с поддержкой</>
                        )) ||
                            (authModal === 'sendEmail' && (
                                <>
                                    Не пришло письмо? Проверьте папку Спам.
                                    <br />
                                    По другим вопросам свяжитесь с поддержкой.
                                </>
                            )) || (
                                <Button
                                    data-test-id='repeat-button'
                                    w={{ md: '332px', base: '252px' }}
                                    h='48px'
                                    border='1px solid rgba(0, 0, 0, 0.08)'
                                    borderRadius='6px'
                                    bg='rgba(0, 0, 0, 0.92)'
                                    _hover={{
                                        bg: 'rgba(0, 0, 0, 0.7)',
                                    }}
                                    color='#fff'
                                    onClick={() => {
                                        setRepeatLogin?.(true);
                                        onClose();
                                    }}
                                >
                                    Повторить
                                </Button>
                            )}
                    </ModalFooter>
                </Flex>
            </ModalContent>
        </Modal>
    </>
);
