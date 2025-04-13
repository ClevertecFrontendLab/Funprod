import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import filterIcon from './../../assets/main/icon/filter.svg';

type PageHeaderProps = {
    title: string;
    description?: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
    const [text, setText] = useState('');
    return (
        <Flex
            direction='column'
            width='100%'
            align={{ sm: 'center', base: 'stretch' }}
            height='100%'
            mt={{ md: '32px', base: '16px' }}
        >
            <Text
                textAlign='center'
                fontFamily='var(--font-family)'
                fontWeight='700'
                fontSize={{ md: '48px', base: '24px' }}
                lineHeight='133%'
            >
                {title}
            </Text>
            {description && (
                <Box w={{ sm: '700px', base: '328px' }} mt={{ md: '12px', base: '16px' }}>
                    <Text
                        fontWeight='500'
                        fontSize={{ md: '16px', base: '14px' }}
                        lineHeight='150%'
                        textAlign='center'
                        color='rgba(0, 0, 0, 0.48)'
                    >
                        Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
                        попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.
                    </Text>
                </Box>
            )}
            <Flex mt={{ md: '32px', base: '16px' }} gap={{ md: '12px', base: '8px' }}>
                <Button
                    bg='transparent'
                    w={{ md: '48px', base: '32px' }}
                    h={{ md: '48px', base: '32px' }}
                    border='1px solid rgba(0, 0, 0, 0.48)'
                    borderRadius='6px'
                    p='0 12px'
                >
                    <Image src={filterIcon} alt='filter' w='24px' h='24px' />
                </Button>
                <Box
                    position='relative'
                    w={{ md: '458px', sm: '404px', base: '284px' }}
                    h={{ md: '48px', base: '32px' }}
                >
                    <InputGroup w='100%' h='100%'>
                        <Input
                            placeholder='Название или ингредиент...'
                            value={text}
                            w='100%'
                            h='100%'
                            onChange={(e) => setText(e.target.value)}
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            borderRadius='6px'
                            sx={{
                                '::placeholder': {
                                    color: '#134b00',
                                },
                            }}
                        />
                        <InputRightElement width='4.5rem'>
                            <Icon
                                as={SearchIcon}
                                position='absolute'
                                top={{ md: '15px', base: '9px' }}
                                right={{ md: '15px', base: '9px' }}
                                cursor='pointer'
                            />
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Flex>
            <Flex display={{ base: 'none', md: 'flex' }} align='center' mt='16px'>
                <Text
                    fontFamily='var(--font-family)'
                    fontWeight='500'
                    fontSize='16px'
                    lineHeight='150%'
                    textAlign='center'
                    mr='12px'
                >
                    Исключить мои аллергены
                </Text>
                <Switch mr='16px' w='34px' h='20px' />
                <Select placeholder='Выберите из списка...' w='234px' h='40px' />
            </Flex>
        </Flex>
    );
};
