import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import spaghetti from './../../../assets//main/juiciest/spaghetti.jpg';
import bookmarkHeart from './../../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../../assets/actionBar/EmojiHeartEyes.svg';
import arrowRight from './../../../assets/main/icon/arrowRight.svg';
import alex from './../../../assets/main/juiciest/alex.jpg';
import elena from './../../../assets/main/juiciest/elena.jpg';
import ham from './../../../assets/main/juiciest/ham.jpg';
import noodles from './../../../assets/main/juiciest/noodles.jpg';
import tomYm from './../../../assets/main/juiciest/tom-ym.jpg';
import secondCourses from './../../../assets/sidebar/SecondCourses.svg';

const juiciestCard = [
    {
        imgUrl: spaghetti,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 185,
            },
            {
                icon: emojiHeartEyes,
                count: 159,
            },
        ],
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
    {
        imgUrl: ham,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 159,
            },
            {
                icon: emojiHeartEyes,
                count: 257,
            },
        ],
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: elena,
            userName: 'Елена Высоцкая',
        },
    },
    {
        imgUrl: noodles,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 258,
            },
            {
                icon: emojiHeartEyes,
                count: 342,
            },
        ],
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: alex,
            userName: ' Alex Cook',
        },
    },
    {
        imgUrl: tomYm,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 124,
            },
            {
                icon: emojiHeartEyes,
                count: 324,
            },
        ],
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
];

export const JuiciestSection = () => (
    <Flex
        direction='column'
        justify='center'
        align='center'
        width='100%'
        mt='40px'
        position={{ md: 'static', base: 'relative' }}
        gap={{ lg: '24px', md: '16px', base: '12px' }}
    >
        <Flex w='100%' justify='space-between'>
            <Text
                fontFamily='var(--font-family)'
                fontWeight='500'
                fontSize={{ lg: '48px', md: '36px', base: '24px' }}
                lineHeight='100%'
            >
                Самое сочное
            </Text>
            <Button
                display={{ md: 'flex', base: 'none' }}
                data-test-id='juiciest-link'
                borderRadius='6px'
                padding='0 24px'
                maxW={{ lg: '197px', base: '167px' }}
                w='100%'
                maxH={{ lg: '48px', base: '40px' }}
                h='100%'
                background=' #b1ff2e'
                _hover={{
                    background: 'rgba(177, 255, 46, 0.6)',
                    border: '1px solid #b1ff2e',
                }}
            >
                <Text fontWeight='600' fontSize={{ lg: '18x', base: '16px' }} lineHeight='150%'>
                    <Link href='/juiciest'>Вся подборка</Link>
                </Text>
                <Image src={arrowRight} ml='8px' w='16px' h='16px' />
            </Button>
        </Flex>
        <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} justify='space-between'>
            {juiciestCard.map((card, index) => (
                <Flex
                    position='relative'
                    key={index}
                    borderRadius='8px'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    maxWidth=''
                    maxW={{ lg: '668px', md: '880px', sm: 'calc(50% - 12px)', base: '328px' }}
                    maxH={{ md: '244px', base: '128px' }}
                    p='8px 8px 4px 8px'
                    h='100%'
                >
                    <Image
                        src={card.imgUrl}
                        maxW={{ md: '346px', base: '158px' }}
                        borderRadius='4px 0 0 4px'
                    />
                    {card.recommendations.userName && (
                        <Box
                            display={{ base: 'none', md: 'block' }}
                            position='absolute'
                            left='24px'
                            bottom='20px'
                        >
                            <Flex
                                w='100%'
                                h='28px'
                                background='#d7ff94'
                                align='center'
                                justify='center'
                                borderRadius='4px'
                                p='4px 8px'
                            >
                                <Image
                                    src={card.recommendations.userImg}
                                    w='16px'
                                    h='16px'
                                    mr='8px'
                                />
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                >
                                    {card.recommendations.userName} рекомендует
                                </Text>
                            </Flex>
                        </Box>
                    )}
                    <Flex
                        p={{ md: '20px 24px', base: '8px 0 4px 8px' }}
                        // m={{ md: '20px 24px', base: '8px 8px 4px 8px' }}
                        direction='column'
                        gap={{ md: '24px', base: '0' }}
                        maxW={{ md: '100%', base: '154px' }}
                        w='100%'
                    >
                        <Flex justify='space-between'>
                            <Link>
                                <Flex
                                    maxW={{ md: '100%', base: '127px' }}
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
                        <Box w={{ lg: '274px', base: '100%' }} h='100px'>
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
                                    noOfLines={{ lg: 3, base: 0 }}
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
            display={{ md: 'none', base: 'Flex' }}
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
                <Link href='/juiciest'>Вся подборка</Link>
            </Text>
            <Image src={arrowRight} ml='8px' w='16px' h='16px' />
        </Button>
    </Flex>
);
