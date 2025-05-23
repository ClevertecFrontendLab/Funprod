import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import alexBlog from './../../../assets/main//alexBlog.jpg';
import elenaBlog from './../../../assets/main//elenaBlog.jpg';
import ekaterina from './../../../assets/main/ekaterina.jpg';
import arrowRight from './../../../assets/main/icon/arrowRight.svg';

const cookingBlogsCard = [
    {
        userImg: elenaBlog,
        userName: 'Елена Высоцкая',
        userAccount: '@elenapovar',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        userImg: alexBlog,
        userName: 'Alex Cook',
        userAccount: '@funtasticooking',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        userImg: ekaterina,
        userName: 'Екатерина Константинопольская',
        userAccount: '@bake_and_pie',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
];

export const CookingBlogsSection = () => (
    <Flex
        direction='column'
        borderRadius='16px'
        padding={{ md: '24px', base: '12px' }}
        maxWidth={{ lg: '1340px', md: '860px', sm: '728px', base: '328px' }}
        w='100%'
        maxHeight={{ lg: '304px', md: '264px', sm: '274px', base: '600px' }}
        h='100%'
        bg='var(--lime-300)'
        mt={{ md: '40px', base: '32px' }}
        gap={{ lg: '24px', md: '16px', base: '12px' }}
    >
        <Flex justify='space-between' align='center'>
            <Text
                fontFamily='var(--font-family)'
                fontWeight='400'
                fontSize={{ lg: '36px', md: '30px', base: '24px' }}
                lineHeight='111%'
            >
                Кулинарные блоги
            </Text>
            <Button
                display={{ md: 'flex', base: 'none' }}
                borderRadius='6px'
                padding={{ md: '0 24px', base: '0 16px' }}
                w={{ lg: '197px', base: '149px' }}
                h={{ lg: '48px', base: '40px' }}
                bg='transparent'
                _hover={{ bg: 'transparent' }}
            >
                <Text fontWeight='600' fontSize={{ lg: '18px', base: '16px' }} lineHeight='150%'>
                    Все авторы
                </Text>
                <Image src={arrowRight} alt='arrowRight' ml='8px' w='16px' h='16px' />
            </Button>
        </Flex>
        <Flex gap={{ md: '16px', base: '12px' }} wrap={{ sm: 'nowrap', base: 'wrap' }}>
            {cookingBlogsCard.map((item, index) => (
                <Link
                    href='/'
                    _hover={{
                        boxShadow: 'md',
                    }}
                    cursor='pointer'
                >
                    <Flex
                        key={index}
                        direction='column'
                        maxW={{ lg: '426px', md: '266px', sm: '226px', base: '304px' }}
                        w='100%'
                        h={{ lg: '184px', md: '160px', base: '152px' }}
                        bg='#fff'
                        borderRadius='8px'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                    >
                        <Flex
                            p={{ lg: '24px 24px 16px 24px', base: '16px 16px 8px 8px' }}
                            gap={{ md: '12px', base: '8px' }}
                        >
                            <Image
                                src={item.userImg}
                                alt={`${item.userName} аватар`}
                                w='48px'
                                h='48px'
                            />
                            <Flex direction='column'>
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='500'
                                    fontSize={{ md: '18px', base: '16px' }}
                                    lineHeight='150%'
                                    noOfLines={1}
                                >
                                    {item.userName}
                                </Text>
                                <Link
                                    fontFamily='var(--font-family)'
                                    fontWeight='400'
                                    fontSize={{ md: '14px', base: '12px' }}
                                    lineHeight='143%'
                                    color='rgba(0, 0, 0, 0.64)'
                                >
                                    {item.userAccount}
                                </Link>
                            </Flex>
                        </Flex>
                        <Box p={{ lg: '12px 24px 20px 24px', base: '8px 16px 16px 16px' }}>
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                noOfLines={3}
                            >
                                {item.text}
                            </Text>
                        </Box>
                    </Flex>
                </Link>
            ))}
        </Flex>
        <Flex justify='center'>
            <Button
                display={{ md: 'none', base: 'flex' }}
                borderRadius='6px'
                padding={{ md: '0 24px', base: '0 16px' }}
                w={{ lg: '197px', base: '149px' }}
                h={{ lg: '48px', base: '40px' }}
                bg='transparent'
                _hover={{ bg: 'transparent' }}
            >
                <Text fontWeight='600' fontSize={{ lg: '18px', base: '16px' }} lineHeight='150%'>
                    Все авторы
                </Text>
                <Image src={arrowRight} alt='arrowRight' ml='8px' w='16px' h='16px' />
            </Button>
        </Flex>
    </Flex>
);
