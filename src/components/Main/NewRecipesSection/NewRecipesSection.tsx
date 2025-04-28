import 'swiper/swiper-bundle.css';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRecipeUrl } from '~/components/Header/Breadcrumbs/getRecipeUrl';

import { mockData, Recipe } from '../../mockData';
import bookmarkHeart from './../../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../../assets/actionBar/EmojiHeartEyes.svg';
import leftSlider from './../../../assets/leftSlider.svg';
import rightSlider from './../../../assets/rightSlider.svg';
import { categoryIcon } from './../../categoryIcon';

type NewRecipesSectionProps = { filteredData?: Recipe[] };

export const NewRecipesSection = ({ filteredData = mockData }: NewRecipesSectionProps) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const swiperRef = useRef(null);

    const sortedRecipes = [...filteredData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    console.log(sortedRecipes);
    const handlePrevClick = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };

    return (
        <Flex direction='column' w='100%' maxHeight='550px' mt='32px' position='relative'>
            <Text
                fontWeight='500'
                fontSize={{ lg: '48px', md: '36px', base: '24px' }}
                lineHeight='100%'
            >
                Новые рецепты
            </Text>
            <Flex
                pt='24px'
                w='100%'
                maxW={{ base: '328px', sm: '100%' }}
                mx='auto'
                overflow={{ md: 'hidden', base: 'auto' }}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
            >
                <Swiper
                    key={filteredData.length}
                    data-test-id='carousel'
                    ref={swiperRef}
                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={3}
                    breakpoints={{
                        320: {
                            slidesPerView: 2.1,
                            spaceBetween: 12,
                        },
                        768: {
                            slidesPerView: 4.3,
                            spaceBetween: 12,
                        },
                        1024: {
                            slidesPerView: 3.09,
                            spaceBetween: 12,
                        },
                        1500: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    style={{ position: 'static', zIndex: 0 }}
                >
                    {sortedRecipes.map((card, i) => (
                        <SwiperSlide key={card.id} data-test-id={`carousel-card-${i}`}>
                            <Link to={getRecipeUrl(card)}>
                                <Box
                                    flex='0 0 auto'
                                    w={{ lg: '322px', md: '277px', base: '158px' }}
                                    h={{ lg: '475px', md: '460px', base: '220px' }}
                                    borderRadius='8px'
                                    border='1px solid rgba(0, 0, 0, 0.08);'
                                >
                                    <Image
                                        src={card.image}
                                        borderRadius='4px 4px 0 0'
                                        w='100%'
                                        h={{ md: '230px', base: '128px' }}
                                        objectFit='cover'
                                    />
                                    <Flex
                                        direction='column'
                                        justify='space-between'
                                        p={{ lg: '16px 24px 20px 24px', md: '12px', base: '8px' }}
                                        h={{ md: '50%', base: '92px' }}
                                    >
                                        <Flex direction='column'>
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
                                        </Flex>
                                        <Flex
                                            justify='space-between'
                                            mt={{ md: '24px', base: '8px' }}
                                        >
                                            <Flex
                                                direction='column'
                                                gap='6px'
                                                top='8px'
                                                left='8px'
                                                position={{
                                                    md: 'static',
                                                    base: 'absolute',
                                                }}
                                            >
                                                {categoryIcon
                                                    .filter((item) =>
                                                        card.category.includes(item.label),
                                                    )
                                                    .map((item, index) => (
                                                        <Link to='/' key={index}>
                                                            <Flex
                                                                w='100%'
                                                                h='24px'
                                                                p={{
                                                                    md: '2px 8px',
                                                                    base: '2px 4px',
                                                                }}
                                                                borderRadius='4px'
                                                                background='var(--lime-150)'
                                                                gap={{ md: '8px', base: '2px' }}
                                                            >
                                                                <Image src={item.icon} />
                                                                <Text
                                                                    fontFamily='var(--font-family)'
                                                                    fontWeight='400'
                                                                    fontSize='14px'
                                                                    lineHeight='143%'
                                                                    whiteSpace='nowrap'
                                                                >
                                                                    {item.title}
                                                                </Text>
                                                            </Flex>
                                                        </Link>
                                                    ))}
                                            </Flex>
                                            <Flex gap='8px' align='flex-end'>
                                                <Flex
                                                    align='center'
                                                    justify='center'
                                                    gap='7px'
                                                    p='0 4px'
                                                >
                                                    <Box w='12px' h='12px'>
                                                        <Image src={bookmarkHeart} />
                                                    </Box>
                                                    <Text
                                                        fontFamily='var(--font-family)'
                                                        fontWeight='600'
                                                        fontSize='12px'
                                                        lineHeight='133%'
                                                        color='var(--lime-600)'
                                                    >
                                                        {card.bookmarks}
                                                    </Text>
                                                </Flex>
                                                <Flex
                                                    align='center'
                                                    justify='center'
                                                    gap='7px'
                                                    p='0 4px'
                                                >
                                                    <Box w='12px' h='12px'>
                                                        <Image src={emojiHeartEyes} />
                                                    </Box>
                                                    <Text
                                                        fontFamily='var(--font-family)'
                                                        fontWeight='600'
                                                        fontSize='12px'
                                                        lineHeight='133%'
                                                        color='var(--lime-600)'
                                                    >
                                                        {card.likes}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Box display={{ base: 'none', md: 'block' }}>
                    <Button
                        data-test-id='carousel-back'
                        position='absolute'
                        top='213px'
                        left='-8px'
                        w='48px'
                        h='48px'
                        p='0'
                        zIndex='1'
                        onClick={handlePrevClick}
                    >
                        <Image src={leftSlider} />
                    </Button>
                    <Button
                        data-test-id='carousel-forward'
                        position='absolute'
                        top='213px'
                        right='-8px'
                        w='48px'
                        h='48px'
                        p='0'
                        zIndex='1'
                        onClick={handleNextClick}
                    >
                        <Image src={rightSlider} />
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
};
