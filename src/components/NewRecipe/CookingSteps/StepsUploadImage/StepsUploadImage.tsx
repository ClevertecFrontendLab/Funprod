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

import { FormData } from '../../NewRecipe';

type UploadImageProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    setValue: UseFormSetValue<FormData>;
    index: number;
};

export const StepsUploadImage = ({ register, setValue, index, watch }: UploadImageProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { ref, ...rest } = register(`steps.${index}.image`);

    const imageValue = watch(`steps.${index}.image`);

    const [uploadFile, { data, error }] = useUploadFileMutation();

    const dispatch = useDispatch();

    const handleImageUpload = () => {
        uploadFile(file!);
    };

    useEffect(() => {
        if (data) {
            setValue(`steps.${index}.image`, data.url, { shouldValidate: true });
            onClose();
        }
    }, [data, index, onClose, setValue]);

    const onBoxImgClick = () => {
        onOpen();
    };

    const onSelectImgClick = () => {
        inputRef.current?.click();
    };

    const handleRef = (el: HTMLInputElement | null) => {
        ref(el);
        inputRef.current = el;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            const previewUrl = URL.createObjectURL(selected);
            setPreview(previewUrl);
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
                onClick={onBoxImgClick}
                cursor='pointer'
                borderRadius='8px'
                width={{ sm: '346px', base: '328px' }}
                height='160px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                overflow='hidden'
                bg='rgba(0, 0, 0, 0.08)'
            >
                {imageValue ? (
                    <Image
                        data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                        src={getFullMediaUrl(imageValue)}
                        alt='preview'
                        objectFit='cover'
                        width='100%'
                        height='100%'
                    />
                ) : (
                    <Image data-test-id={`recipe-steps-image-block-${index}`} src={uploadImg} />
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
                        <Box>
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
                                        data-test-id={`recipe-steps-image-block-${index}-input-file`}
                                        type='file'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        ref={handleRef}
                                        {...rest}
                                        onChange={handleChange}
                                    />
                                    <Box
                                        onClick={onSelectImgClick}
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
                                                src={preview || getFullMediaUrl(imageValue!)}
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
                        </Box>
                        <ModalFooter mt='32px' p='0'>
                            {(file || imageValue) && (
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
