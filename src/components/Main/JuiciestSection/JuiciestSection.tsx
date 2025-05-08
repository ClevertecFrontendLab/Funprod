import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router';

import { CategoryTags } from '~/components/CategoryPage/TabComponent/CategoryTags/CategoryTags';
import { Category } from '~/query/services/category-api.type';
import { useGetRecipesQuery } from '~/query/services/recipe-api';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import bookmarkHeart from './../../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../../assets/actionBar/EmojiHeartEyes.svg';
import arrowRight from './../../../assets/main/icon/arrowRight.svg';

type JuiciestSectionProps = {
    categoryData?: Category[];
};

export const JuiciestSection = ({ categoryData }: JuiciestSectionProps) => {
    const navigate = useNavigate();
    const { data } = useGetRecipesQuery({
        page: 1,
        limit: 4,
        sortBy: 'likes',
        sortOrder: 'desc',
    });

    const handleGetRecipe = (recipeId: string, categoriesIds: string[]) => {
        const { condition, matchedCategory, matchedSubcategory } = checkAndNavigate({
            categoriesIds,
            categoryData,
        });
        if (condition) {
            navigate('/error-page');
            return;
        }
        navigate(`/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeId}`);
    };

    return (
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
                    {data && 'Самое сочное'}
                </Text>
                {data && (
                    <Button
                        display={{ sm: 'flex', base: 'none' }}
                        data-test-id='juiciest-link'
                        borderRadius='6px'
                        padding='0 24px'
                        maxW={{ lg: '197px', base: '167px' }}
                        w='100%'
                        h={{ lg: '48px', base: '40px' }}
                        maxH='100%'
                        background=' #b1ff2e'
                        _hover={{
                            background: 'rgba(177, 255, 46, 0.6)',
                            border: '1px solid #b1ff2e',
                        }}
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ lg: '18x', base: '16px' }}
                            lineHeight='150%'
                        >
                            <Link to='/the-juiciest'>Вся подборка</Link>
                        </Text>
                        <Image src={arrowRight} ml='8px' w='16px' h='16px' />
                    </Button>
                )}
            </Flex>
            <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} justify='space-between'>
                {data?.data.map((card, i) => (
                    <Flex
                        position='relative'
                        key={i}
                        borderRadius='8px'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        maxWidth=''
                        maxW={{ lg: '668px', md: '880px', sm: 'calc(50% - 12px)', base: '328px' }}
                        w='100%'
                        h={{ lg: '324px', md: '400px', base: '128px' }}
                    >
                        <Flex flex='1' maxW={{ lg: '346px', md: '400px', base: '158px' }} w='100%'>
                            <Image
                                src={getFullMediaUrl(card.image)}
                                maxW={{ lg: '346px', md: '400px', base: '158px' }}
                                borderRadius='4px 0 0 4px'
                            />
                        </Flex>
                        <Flex
                            flex='1'
                            p={{ md: '20px 24px', base: '8px 8px 4px 8px' }}
                            direction='column'
                            gap={{ md: '24px', base: '0' }}
                            maxW={{ md: '334px', base: '154px' }}
                            w='100%'
                        >
                            <Flex justify={{ md: 'space-between', base: 'flex-start' }}>
                                <CategoryTags tagsId={card.categoriesIds} />
                                <Flex
                                    gap='8px'
                                    ml={{ md: '16px', base: '0' }}
                                    mr={{ base: '85px', md: '0' }}
                                >
                                    <Flex gap='8px' align='flex-start'>
                                        <Flex align='center' justify='center' gap='7px' p='0 4px'>
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
                                        <Flex align='center' justify='center' gap='7px' p='0 4px'>
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
                            <Flex justify='flex-end' gap='8px' mt='auto'>
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
                                    data-test-id={`card-link-${i}`}
                                    borderRadius='6px'
                                    p={{ md: '0 12px', base: '0 6px' }}
                                    w='87px'
                                    h={{ md: '32px', base: '24px' }}
                                    backgroundColor='rgba(0, 0, 0, 0.92)'
                                    _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}
                                    onClick={() => handleGetRecipe(card._id, card.categoriesIds)}
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
            {data && (
                <Button
                    display={{ sm: 'none', base: 'Flex' }}
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
                        <Link to='/the-juiciest'>Вся подборка</Link>
                    </Text>
                    <Image src={arrowRight} ml='8px' w='16px' h='16px' />
                </Button>
            )}
        </Flex>
    );
};
