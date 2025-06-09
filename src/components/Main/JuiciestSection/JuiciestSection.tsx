import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router';

import { CategoryTags } from '~/components/CategoryPage/TabComponent/CategoryTags/CategoryTags';
import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api/category-api.type';
import {
    useBookmarkRecipeMutation,
    useGetRecipesQuery,
} from '~/query/services/recipe-api/recipe-api';
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
        const { matchedCategory, matchedSubcategory } = checkAndNavigate({
            categoriesIds,
            categoryData: categoryData || [],
        });
        navigate(`/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeId}`);
    };
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const handleOnClick = (id: string) => {
        bookmarkRecipe(id);
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
                        display={{ md: 'flex', base: 'none' }}
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
                            <Link to={ROUTES.JUICIEST}>Вся подборка</Link>
                        </Text>
                        <Image src={arrowRight} ml='8px' w='16px' h='16px' />
                    </Button>
                )}
            </Flex>
            <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }}>
                {Array.isArray(data?.data) &&
                    data.data.map((card, i) => (
                        <Flex
                            position='relative'
                            key={card._id}
                            borderRadius='8px'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            maxWidth=''
                            maxW={{
                                lg: '668px',
                                md: '860px',
                                sm: 'calc(50% - 12px)',
                                base: '328px',
                            }}
                            w='100%'
                            h={{ lg: '324px', md: '300px', base: '148px' }}
                        >
                            <Flex maxW={{ lg: '346px', md: '400px', base: '158px' }} w='100%'>
                                <Image
                                    src={getFullMediaUrl(card.image)}
                                    borderRadius='4px 0 0 4px'
                                />
                            </Flex>
                            <Flex
                                p={{ md: '20px 24px', base: '8px 8px 4px 8px' }}
                                direction='column'
                                gap={{ md: '24px', base: '0' }}
                                maxW={{ lg: '334px', md: '460px', sm: '200px', base: '154px' }}
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
                                            noOfLines={3}
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
                                        onClick={() => handleOnClick(card._id)}
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
                                        onClick={() =>
                                            handleGetRecipe(card._id, card.categoriesIds)
                                        }
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
                        <Link to={ROUTES.JUICIEST}>Вся подборка</Link>
                    </Text>
                    <Image src={arrowRight} ml='8px' w='16px' h='16px' />
                </Button>
            )}
        </Flex>
    );
};
