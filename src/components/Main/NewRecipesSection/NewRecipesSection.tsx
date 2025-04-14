import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import bookmarkHeart from './../../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../../assets/actionBar/EmojiHeartEyes.svg';
import leftSlider from './../../../assets/leftSlider.svg';
import cutlets from './../../../assets/main/cutlets.jpg';
import pancakes from './../../../assets/main/pancakes.jpg';
import salad from './../../../assets/main/salad.jpg';
import soup from './../../../assets/main/soup.jpg';
import rightSlider from './../../../assets/rightSlider.svg';
import firstCoursesIcon from './../../../assets/sidebar/FirstCourses.svg';
import pastryIcon from './../../../assets/sidebar/pastry.svg';
import saladIcon from './../../../assets/sidebar/salad.svg';
import veganIcon from './../../../assets/sidebar/vegan.svg';

const recipeСards = [
    {
        imgUrl: soup,
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        labels: {
            icon: firstCoursesIcon,
            label: 'Первые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 1,
            },
        ],
    },
    {
        imgUrl: cutlets,
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        labels: {
            icon: veganIcon,
            label: 'Первые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 2,
            },
            {
                icon: emojiHeartEyes,
                count: 1,
            },
        ],
    },
    {
        imgUrl: pancakes,
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        labels: {
            icon: pastryIcon,
            label: 'Десерты, выпечка',
        },
        icons: [
            {
                icon: emojiHeartEyes,
                count: 1,
            },
        ],
    },
    {
        imgUrl: salad,
        title: 'Салат "Здоровье"',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        labels: {
            icon: saladIcon,
            label: 'Салаты',
        },
        icons: [],
    },
    {
        imgUrl: salad,
        title: 'Салат "Здоровье"',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        labels: {
            icon: saladIcon,
            label: 'Салаты',
        },
        icons: [],
    },
];

export const NewRecipesSection = () => (
    <Flex direction='column' w='100%' maxHeight='486px' mt='32px' position='relative'>
        <Text
            fontWeight='500'
            fontSize={{ lg: '48px', md: '36px', base: '24px' }}
            lineHeight='100%'
        >
            Новые рецепты
        </Text>
        <Flex
            pt='24px'
            gap={{ lg: '24px', base: '8px' }}
            maxW={{ base: '328px', sm: '100%' }}
            w='100%'
            overflow={{ md: 'hidden', base: 'auto' }}
            sx={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
            }}
        >
            {recipeСards.map((card, index) => (
                <Box
                    position={{ md: 'static', base: 'relative' }}
                    flex='0 0 auto'
                    key={index}
                    w={{ lg: '322px', md: '277px', base: '158px' }}
                    h={{ lg: '414px', md: '402px', base: '220px' }}
                    borderRadius='8px'
                    border='1px solid rgba(0, 0, 0, 0.08);'
                >
                    <Image
                        src={card.imgUrl}
                        borderRadius='4px 4px 0 0'
                        w='100%'
                        h={{ md: '230px', base: '128px' }}
                        objectFit='cover'
                    />
                    <Box p={{ lg: '16px 24px 20px 24px', md: '12px', base: '8px' }}>
                        <Box>
                            <Text
                                fontWeight='500'
                                fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                                lineHeight='150%'
                                noOfLines={{ md: 1, base: 2 }}
                                overflow='hidden'
                                textOverflow='ellipsis'
                            >
                                {card.title}
                            </Text>
                            <Box display={{ base: 'none', md: 'block' }}>
                                <Text
                                    mt='8px'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                    noOfLines={3}
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                >
                                    {card.description}
                                </Text>
                            </Box>
                        </Box>
                        <Flex justify='space-between' mt={{ md: '24px', base: '8px' }}>
                            <Link
                                position={{ md: 'static', base: 'absolute' }}
                                top='8px'
                                left='2px'
                            >
                                <Flex
                                    w='100%'
                                    h='24px'
                                    p={{ md: '2px 8px', base: '2px 4px' }}
                                    borderRadius='4px'
                                    background='var(--lime-150)'
                                    gap={{ md: '8px', base: '2px' }}
                                >
                                    <Image src={card.labels.icon} />
                                    <Text
                                        fontFamily='var(--font-family)'
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='143%'
                                        whiteSpace='nowrap'
                                    >
                                        {card.labels.label}
                                    </Text>
                                </Flex>
                            </Link>
                            <Flex gap='8px'>
                                {card.icons.map((icon, index) => (
                                    <Flex
                                        key={index}
                                        align='center'
                                        justify='center'
                                        gap='7px'
                                        p='0 4px'
                                    >
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
                    </Box>
                </Box>
            ))}
            <Box display={{ base: 'none', md: 'block' }}>
                <Button position='absolute' bottom='219px' left='-8px' w='48px' h='48px' p='0'>
                    <Image src={leftSlider} />
                </Button>
                <Button position='absolute' bottom='219px' right='-8px' w='48px' h='48px' p='0'>
                    <Image src={rightSlider} />
                </Button>
            </Box>
        </Flex>
    </Flex>
);
