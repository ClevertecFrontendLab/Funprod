import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import { FooterProps } from './type';

export const Footer = ({ title, description, card, list }: FooterProps) => (
    <Flex
        direction='column'
        maxWidth='1360px'
        w='100%'
        mt='40px'
        gap='24px'
        borderTop='1px solid rgba(0, 0, 0, 0.08)'
    >
        <Flex
            justify='space-between'
            gap={{ md: '24px', base: '12px' }}
            direction={{ md: 'row', base: 'column' }}
            mt={{ base: '8px', md: '24px' }}
        >
            <Text
                flex='1'
                fontFamily='var(--font-family)'
                fontWeight='500'
                fontSize={{ lg: '48px', md: '36px', base: '24px' }}
                lineHeight='111%'
                whiteSpace='wrap'
            >
                {title}
            </Text>
            <Text
                flex={{ lg: '1', base: '2' }}
                fontFamily='var(--font-family)'
                fontWeight='500'
                fontSize={{ md: '16px', base: '14px' }}
                lineHeight='150%'
                color='rgba(0, 0, 0, 0.64)'
            >
                {description}
            </Text>
        </Flex>
        <Flex
            direction={{ sm: 'row', base: 'column' }}
            gap={{ lg: '24px', md: '16px', base: '12px' }}
        >
            {card.map((card, index) => (
                <Flex
                    key={index}
                    direction='column'
                    borderRadius='8px'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    w={{ lg: '322px', md: '282px', sm: '232px', base: '328px' }}
                    h={{ lg: '192px', md: '180px', base: '168px' }}
                    p={{ lg: '24px', base: '16px' }}
                >
                    <Flex
                        direction='column'
                        w={{ lg: '274px', md: '250px', sm: '208px', base: '272px' }}
                        gap='8px'
                    >
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='500'
                            fontSize={{ md: '20px', base: '16px' }}
                            lineHeight='150%'
                            noOfLines={1}
                        >
                            {card.title}
                        </Text>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='400'
                            fontSize='14px'
                            lineHeight='143%'
                            noOfLines={3}
                        >
                            {card.description}
                        </Text>
                    </Flex>
                    <Flex justify='space-between' mt='24px'>
                        <Link>
                            <Flex
                                w='141px'
                                h='24px'
                                borderRadius='4px'
                                background='var(--lime-50)'
                                gap='6px'
                                align='center'
                                justify='center'
                            >
                                <Image src={card.labels.icon} w='16px' h='16px' />
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                >
                                    {card.labels.label}
                                </Text>
                            </Flex>
                        </Link>
                        <Flex gap='6px' ml={{ md: '36px', base: '0' }}>
                            {card.icons.map((icon, index) => (
                                <Flex key={index} align='center' justify='center' gap='7px'>
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
                </Flex>
            ))}
            <Flex direction='column' gap={{ md: '12px', sm: '6px', base: '12px' }}>
                {list.map((list, index) => (
                    <Flex
                        key={index}
                        border='1px solid rgba(0, 0, 0, 0.08);'
                        borderRadius='8px'
                        w={{ lg: '668px', md: '282px', sm: '240px', base: '328px' }}
                        h={{ lg: '56px', base: '52px' }}
                        align='center'
                        justify='space-between'
                        gap={{ lg: '12px', md: '8px', base: '6px' }}
                    >
                        <Flex gap={{ lg: '12px', base: '6px' }}>
                            <Image src={list.Icon} ml={{ lg: '24px', base: '12px' }} />
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='500'
                                fontSize={{ lg: '20px', base: '18px' }}
                                lineHeight='140%'
                                noOfLines={1}
                            >
                                {list.title}
                            </Text>
                        </Flex>
                        <Button
                            mr={{ lg: '24px', base: '12px' }}
                            maxW={{ lg: '87px', base: '70px' }}
                            w='100%'
                            h={{ md: '32px', base: '24px' }}
                            border='1px solid var(--lime-600)'
                            bg='transparent'
                            color='var(--lime-600)'
                        >
                            <Text
                                fontWeight='600'
                                fontSize={{ lg: '14px', base: '12px' }}
                                lineHeight='143%'
                            >
                                Готовить
                            </Text>
                        </Button>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    </Flex>
);
