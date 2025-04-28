import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { Link as Links } from 'react-router';

import { highlightText } from '~/utilities/highlightText';

import { categoryIcon } from '../categoryIcon';
import { mockData, Recipe } from '../mockData';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';

type SearchFilterProps = {
    filteredData?: Recipe[];
    searchQuery: string;
};

export const SearchFilter = ({ filteredData = mockData, searchQuery }: SearchFilterProps) => {
    const getRecipeUrl = (recipe: Recipe) => {
        const mainCategory = recipe.category[0];
        const subCategory = recipe.subcategory[0];

        return `/${mainCategory}/${subCategory}/${recipe.id}`;
    };

    return (
        <Flex direction='column' align='center' gap='16px' mt='42px'>
            <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} justify='space-between'>
                {filteredData.map((card: Recipe, i) => (
                    <Flex
                        data-test-id={`food-card-${i}`}
                        position='relative'
                        key={card.id}
                        borderRadius='8px'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        maxWidth=''
                        maxW={{
                            lg: '668px',
                            md: '880px',
                            sm: 'calc(50% - 12px)',
                            base: '356px',
                        }}
                        w='100%'
                        maxH={{ md: '300px', base: '128px' }}
                    >
                        <Image
                            src={card.image}
                            w={{ md: '346px', base: '158px' }}
                            borderRadius='4px 0 0 4px'
                        />
                        <Flex
                            p={{ md: '20px 24px', base: '0' }}
                            m={{ md: '0', base: '8px 8px 4px 8px' }}
                            direction='column'
                            gap={{ md: '24px', base: '0' }}
                            w={{ base: '154px', sm: '182px', md: '100%' }}
                            justify='space-between'
                        >
                            <Flex direction='column'>
                                <Flex justify={{ md: 'space-between', base: 'flex-start' }}>
                                    <Flex
                                        direction='column'
                                        gap='4px'
                                        position={{ md: 'static', base: 'absolute' }}
                                        top='8px'
                                        left='8px'
                                    >
                                        {categoryIcon
                                            .filter((item) => card.category.includes(item.label))
                                            .map((item) => (
                                                <Link
                                                    position={{
                                                        md: 'static',
                                                        base: 'absolute',
                                                    }}
                                                    top='8px'
                                                    left='2px'
                                                >
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
                                    <Flex
                                        ml={{ md: '36px', base: '0' }}
                                        mr={{ base: '85px', md: '0' }}
                                    >
                                        <Flex gap='8px' align='flex-start'>
                                            <Flex gap='6px' align='center'>
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
                                            <Flex gap='6px' align='center'>
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
                                <Box w={{ lg: '274px', base: '100%' }} textAlign='start' mt='10px'>
                                    <Text
                                        fontFamily='var(--font-family)'
                                        fontWeight='500'
                                        fontSize={{ md: '20px', base: '16px' }}
                                        lineHeight='140%'
                                        noOfLines={{ md: 1, base: 2 }}
                                        overflow='hidden'
                                        textOverflow='ellipsis'
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(card.title, searchQuery),
                                        }}
                                    />
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
                            </Flex>
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
                                <Links to={getRecipeUrl(card)}>
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
                                </Links>
                            </Flex>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};
