import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import uploadImg from '~/assets/newRecipe/uploadImg.svg';
import { useUploadFileMutation } from '~/query/services/uploadFile-api';
import { setAppError } from '~/store/app-slice';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { FormData } from '../NewRecipe';

type UploadImageProps = {
    setValue: UseFormSetValue<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    register: UseFormRegister<FormData>;
};

export const UploadImage = ({ setValue, watch, errors, register }: UploadImageProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const imageValue = watch('image');

    const [uploadFile, { data, error }] = useUploadFileMutation();

    const dispatch = useDispatch();
    useEffect(() => {
        register('image', { required: true });
    }, [register]);

    const handleImageUpload = () => {
        uploadFile(file!);
        setPreview(getFullMediaUrl(imageValue));
    };

    useEffect(() => {
        if (data) {
            setValue('image', data.url, { shouldValidate: true });
            onClose();
        }
    }, [data, onClose, setValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
            e.target.value = '';
        }
    };

    useEffect(() => {
        if (error) {
            onClose();
            dispatch(
                setAppError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте сохранить фото позже.',
                }),
            );
        }
    });

    const handleDeleteButton = () => {
        setFile(null);
        setPreview(null);
        onClose();
    };

    return (
        <>
            <Box
                data-test-id='recipe-image-block'
                onClick={onOpen}
                cursor='pointer'
                borderRadius='8px'
                width={{ lg: '553px', md: '353px', sm: '232px', base: '328px' }}
                height={{ md: '410px', base: '224px' }}
                display='flex'
                alignItems='center'
                justifyContent='center'
                overflow='hidden'
                bg='rgba(0, 0, 0, 0.08)'
                border={errors.image ? '2px solid #E53E3E' : 'none'}
            >
                {imageValue ? (
                    <Image
                        data-test-id='recipe-image-block-preview-image'
                        src={getFullMediaUrl(imageValue)}
                        alt='uploaded'
                        objectFit='cover'
                        width='100%'
                        height='100%'
                    />
                ) : (
                    <Image src={uploadImg} alt='placeholder' />
                )}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalContent
                    data-test-id='recipe-image-modal'
                    borderRadius='16px'
                    w={{ md: '396px', base: '316px' }}
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
                    <Flex direction='column' align='center' m='32px'>
                        <ModalHeader
                            fontWeight='700'
                            fontSize='24px'
                            lineHeight='133%'
                            textAlign='center'
                            m='0 32px'
                            p='0'
                        >
                            Изображение
                        </ModalHeader>
                        <ModalBody m='32px 32px 0 32px' p='0'>
                            <Text
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='150%'
                                textAlign='center'
                                color='rgba(0, 0, 0, 0.64)'
                            >
                                <Input
                                    data-test-id='recipe-image-block-input-file'
                                    type='file'
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                />
                                <Box
                                    onClick={() => inputRef.current?.click()}
                                    cursor='pointer'
                                    borderRadius='8px'
                                    width={{ md: '206px', base: '108px' }}
                                    height={{ md: '206px', base: '108px' }}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    overflow='hidden'
                                    bg='rgba(0, 0, 0, 0.08)'
                                >
                                    {preview || imageValue ? (
                                        <Image
                                            data-test-id='recipe-image-modal-preview-image'
                                            src={preview || getFullMediaUrl(imageValue)}
                                            alt='preview'
                                            objectFit='cover'
                                            width='100%'
                                            height='100%'
                                        />
                                    ) : (
                                        <Image src={uploadImg} alt='placeholder' />
                                    )}
                                </Box>
                            </Text>
                        </ModalBody>

                        <ModalFooter mt='32px' p='0'>
                            {file && (
                                <Flex direction='column' gap='16px'>
                                    <Button
                                        border='1px solid rgba(0, 0, 0, 0.08)'
                                        borderRadius='6px'
                                        w={{ md: '332px', base: '232px' }}
                                        h={{ md: '48px', base: '36px' }}
                                        bg='rgba(0, 0, 0, 0.92)'
                                        color='#fff'
                                        fontWeight='600'
                                        fontSize='18px'
                                        lineHeight='156%'
                                        onClick={handleImageUpload}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        borderRadius='6px'
                                        w={{ md: '332px', base: '232px' }}
                                        h={{ md: '48px', base: '36px' }}
                                        bg='transparent'
                                        color='#000'
                                        fontWeight='600'
                                        fontSize='18px'
                                        lineHeight='156%'
                                        onClick={handleDeleteButton}
                                    >
                                        Удалить
                                    </Button>
                                </Flex>
                            )}
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
};
