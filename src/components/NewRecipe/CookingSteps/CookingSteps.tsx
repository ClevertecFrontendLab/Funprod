import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, FormLabel, IconButton, Text, Textarea } from '@chakra-ui/react';
import {
    Control,
    FieldErrors,
    useFieldArray,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { FormData } from '../NewRecipe';
import { StepsUploadImage } from './StepsUploadImage/StepsUploadImage';

type CookingStepsProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    setValue: UseFormSetValue<FormData>;
    control: Control<FormData>;
};

export const CookingSteps = ({ register, watch, errors, setValue, control }: CookingStepsProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const handleAddStep = () =>
        append({
            stepNumber: fields.length + 1,
            description: null,
            image: null,
        });

    return (
        <Flex w='100%' justify='center'>
            <Flex direction='column' gap='16px' w={{ md: '668px', sm: '604px', base: '328px' }}>
                <Flex align='center' textAlign='start'>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '16px', base: '14px' }}
                        lineHeight='150%'
                        color='#000'
                    >
                        Добавьте шаги приготовления
                    </Text>
                </Flex>
                {fields.map((field, index) => (
                    <Flex
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        h={{ sm: '160px', base: '352px' }}
                        gap='20px'
                        direction={{ sm: 'row', base: 'column' }}
                    >
                        <StepsUploadImage
                            key={field.id}
                            register={register}
                            watch={watch}
                            errors={errors}
                            setValue={setValue}
                            index={index}
                        />
                        <Flex
                            direction='column'
                            gap='16px'
                            justify='center'
                            p={{ sm: '0', base: '0 20px' }}
                        >
                            <Flex align='center' justify='space-between'>
                                <Flex
                                    w='51px'
                                    h='20px'
                                    bg='rgba(0, 0, 0, 0.06)'
                                    justify='center'
                                    align='center'
                                >
                                    <Text
                                        fontWeight='600'
                                        fontSize='12px'
                                        lineHeight='133%'
                                        letterSpacing='0.03em'
                                        color='#000'
                                    >
                                        Шаг {index + 1}
                                    </Text>
                                </Flex>
                                {fields.length > 1 && (
                                    <IconButton
                                        data-test-id={
                                            index === 0 ? '' : `recipe-steps-remove-button-${index}`
                                        }
                                        icon={<DeleteIcon color='#2DB100' w='12px' h='14px' />}
                                        aria-label='Удалить ингредиент'
                                        onClick={() => remove(index)}
                                        minW='0px'
                                        w='32px'
                                        h='32px'
                                        p='0'
                                        bg='transparent'
                                    />
                                )}
                            </Flex>
                            <FormControl isInvalid={!!errors.steps?.[index]?.description}>
                                <FormLabel>
                                    <Textarea
                                        data-test-id={`recipe-steps-description-${index}`}
                                        placeholder='Шаг'
                                        border='1px solid #e2e8f0'
                                        h={{ sm: '84px', base: '116px' }}
                                        w='282px'
                                        borderRadius='6px'
                                        {...register(`steps.${index}.description`, {
                                            required: 'Введите краткое описание шага',
                                            maxLength: {
                                                value: 500,
                                                message: 'Максимальная длина 500 символов',
                                            },
                                        })}
                                        _placeholder={{
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            lineHeight: '143%',
                                            color: 'rgba(0, 0, 0, 0.36)',
                                        }}
                                    />
                                </FormLabel>
                            </FormControl>
                        </Flex>
                    </Flex>
                ))}
                <Flex w='100%' justify='flex-end'>
                    <Button
                        w='123px'
                        h='32px'
                        borderRadius='6px'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        bg='rgba(255, 255, 255, 0.06)'
                        onClick={handleAddStep}
                        rightIcon={
                            <IconButton
                                icon={<AddIcon m='0' w='8px' h='8px' color='#FFF' />}
                                aria-label='Добавить ингредиент'
                                bg='#000'
                                minW='0px'
                                w='14px'
                                h='14px'
                                p='0'
                                border='1px solid #000'
                                borderRadius='50%'
                            />
                        }
                    >
                        <Text
                            fontWeight='600'
                            fontSize='14px'
                            lineHeight='143%'
                            color='rgba(0, 0, 0, 0.8)'
                        >
                            Новый шаг
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
