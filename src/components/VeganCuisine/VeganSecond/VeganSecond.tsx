import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import bookmarkHeart from './../../../assets/actionBar/BookmarkHeart.svg';
import { veganSecondCard } from './VeganSecondData';

export const SecondCourses = () => (
    <Flex direction='column' align='center' gap='16px' mt='22px'>
        <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} justify='space-between'>
            {veganSecondCard.map((card, index) => (
                <Flex
                    position='relative'
                    key={index}
                    borderRadius='8px'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    maxWidth=''
                    maxW={{ lg: '668px', md: '880px', sm: 'calc(50% - 12px)', base: '356px' }}
                    w='100%'
                    maxH={{ md: '244px', base: '128px' }}
                    h='100%'
                >
                    <Image
                        src={card.imgUrl}
                        maxW={{ md: '346px', base: '158px' }}
                        borderRadius='4px 0 0 4px'
                    />
                    <Flex
                        p={{ md: '20px 24px', base: '8px 8px 4px 8px' }}
                        direction='column'
                        gap={{ md: '24px', base: '0' }}
                        w='100%'
                    >
                        <Flex justify='space-between'>
                            <Link>
                                <Flex
                                    maxW={{ md: '100%', base: '140px' }}
                                    w='100%'
                                    h='24px'
                                    p={{ md: '2px 8px', base: '2px 4px' }}
                                    borderRadius='4px'
                                    background='var(--lime-50)'
                                    gap={{ md: '8px', base: '2px' }}
                                    align='center'
                                    position={{ md: 'static', base: 'absolute' }}
                                    top='8px'
                                    left='8px'
                                >
                                    <Image src={card.labels.icon} w='16px' h='16px' />
                                    <Text
                                        fontFamily='var(--font-family)'
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='143%'
                                        whiteSpace='no-wrap'
                                        textAlign='start'
                                    >
                                        {card.labels.label}
                                    </Text>
                                </Flex>
                            </Link>
                            <Flex
                                gap='8px'
                                ml={{ md: '36px', base: '0' }}
                                mr={{ base: '85px', md: '0' }}
                            >
                                {card.icons.map((icon, index) => (
                                    <Flex key={index} align='center' justify='center' gap='6px'>
                                        <Box w='12px' h='12px'>
                                            <Image src={icon.icon} />
                                        </Box>
                                        <Text
                                            fontFamily='var(--font-family)'
                                            fontWeight='600'
                                            fontSize='12px'
                                            lineHeight='133%'
                                            color='var(--lime-600)'
                                        >
                                            {icon.count}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        <Box w={{ lg: '274px', base: '100%' }} h='100px' textAlign='start'>
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='500'
                                fontSize={{ md: '20px', base: '16px' }}
                                lineHeight='140%'
                                noOfLines={{ lg: 1, base: 0 }}
                                overflow='hidden'
                                textOverflow='ellipsis'
                            >
                                {card.title}
                            </Text>
                            <Box display={{ base: 'none', md: 'block' }}>
                                <Text
                                    mt='8px'
                                    fontFamily='var(--font-family)'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                    noOfLines={{ md: 3, base: 0 }}
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                >
                                    {card.description}
                                </Text>
                            </Box>
                        </Box>
                        <Flex justify='flex-end' gap='8px'>
                            <Button
                                border='1px solid rgba(0, 0, 0, 0.48)'
                                borderRadius='6px'
                                p={{ md: '0 12px', base: '0' }}
                                w={{ md: '122px', base: '24px' }}
                                minW='0'
                                h={{ md: '32px', base: '24px' }}
                                backgroundColor='rgba(255, 255, 255, 0.06)'
                                _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
                            >
                                <Image
                                    src={bookmarkHeart}
                                    mr={{ md: '8px', base: '0' }}
                                    w={{ md: '14px', base: '12px' }}
                                    h={{ md: '14px', base: '12px' }}
                                />
                                <Box display={{ base: 'none', md: 'block' }}>
                                    <Text
                                        fontFamily='var(--font-family)'
                                        fontWeight='600'
                                        fontSize='14px'
                                        lineHeight='143%'
                                    >
                                        Сохранить
                                    </Text>
                                </Box>
                            </Button>
                            <Button
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                borderRadius='6px'
                                p={{ md: '0 12px', base: '0 6px' }}
                                w='87px'
                                h={{ md: '32px', base: '24px' }}
                                backgroundColor='rgba(0, 0, 0, 0.92)'
                                _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}
                            >
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='600'
                                    fontSize='14px'
                                    lineHeight='143%'
                                    color='#fff'
                                >
                                    Готовить
                                </Text>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            ))}
        </Flex>
        <Button
            data-test-id='juiciest-link-mobile'
            borderRadius='6px'
            padding='0 24px'
            maxW={{ lg: '197px', base: '167px' }}
            maxH={{ lg: '48px', base: '40px' }}
            background=' #b1ff2e'
            _hover={{
                background: 'rgba(177, 255, 46, 0.6)',
                border: '1px solid #b1ff2e',
            }}
        >
            <Text fontWeight='600' fontSize={{ lg: '18x', base: '16px' }} lineHeight='150%'>
                Загрузить еще
            </Text>
        </Button>
    </Flex>
);
