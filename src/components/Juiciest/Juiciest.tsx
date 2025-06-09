import { Box, Button, Flex, Image, Link, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useGetRecipesQuery } from '~/query/services/recipe-api/recipe-api';
import { RecipeData } from '~/query/services/recipe-api/recipe-api.type';
import { categoriesSelector } from '~/store/app-slice';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { CategoryTags } from '../CategoryPage/TabComponent/CategoryTags/CategoryTags';
import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import useRecipeFilters from './../../hooks/useRecipeFilters';

export const Juiciest = () => {
    const navigate = useNavigate();
    const {
        filteredRecipes,
        excludedIngredients,
        setExcludedIngredients,
        selectedCategory,
        selectedMeat,
        selectedSide,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
        searchQuery,
        setSearchQuery,
        categoriesIds,
        allergens,
        meat,
        side,
    } = useRecipeFilters();
    const [page, setPage] = useState(1);
    const [allRecipes, setAllRecipes] = useState<RecipeData[] | []>([]);
    const { data, isFetching } = useGetRecipesQuery({
        page,
        limit: 8,
        sortBy: 'likes',
        sortOrder: 'desc',
    });
    const categoryData = useSelector(categoriesSelector);
    const [isFilterApplied, setIsFilterApplied] = useState<string | boolean>(false);
    const [isLoadingSearch, setIsLoading] = useState(false);

    useEffect(() => {
        if (data?.data) {
            setAllRecipes((prev) => {
                if (page < 3) {
                    return page === 1 ? data.data : [...prev, ...data.data];
                } else {
                    const newRecipes = data.data.filter(
                        (newItem) => !prev.some((existing) => existing._id === newItem._id),
                    );
                    return [...prev, ...newRecipes];
                }
            });
        }
    }, [data, page]);

    const handleLoadMore = () => {
        if (!isFetching && data?.meta && page < data.meta.totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const isApplied =
            excludedIngredients.length > 0 ||
            selectedCategory ||
            selectedMeat.length > 0 ||
            selectedSide.length > 0 ||
            searchQuery.length > 0;

        setIsFilterApplied(!!isApplied);
    }, [excludedIngredients, selectedCategory, selectedMeat, selectedSide, searchQuery]);
    const dataCategories = useCategoriesWithSubcategories();

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

    const isDisabledButton = page >= (data?.meta?.totalPages || 0) || isFetching;

    return (
        <Flex
            w={{
                base: '328px',
                sm: '728px',
                md: '880px',
                lg: '1360px',
            }}
            direction='column'
            m={{ base: '80px 16px 100px 16px', sm: '80px 72px 100px 24px', md: '80px 72px 0 24px' }}
        >
            <PageHeader
                title='Самое сочное'
                selectedOptions={excludedIngredients}
                onChange={setExcludedIngredients}
                setSelectedCategory={setSelectedCategory}
                setSelectedSide={setSelectedSide}
                setSelectedMeat={setSelectedMeat}
                selectedCategory={selectedCategory}
                filteredData={filteredRecipes}
                selectedMeat={selectedMeat}
                selectedSide={selectedSide}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isLoading={isLoadingSearch}
            />
            {isFilterApplied ? (
                <SearchFilter
                    filteredData={dataCategories}
                    searchQuery={searchQuery}
                    categoryData={categoryData!}
                    categoriesIds={categoriesIds}
                    allergens={allergens}
                    meat={meat}
                    garnish={side}
                    onLoadingChange={(val) => setIsLoading(val)}
                />
            ) : (
                <>
                    <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} mt='32px'>
                        {allRecipes.map((card, i) => (
                            <Flex
                                data-test-id={`food-card-${i}`}
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
                                h={{ lg: '324px', md: '400px', base: '128px' }}
                            >
                                <Flex flex='1'>
                                    <Image
                                        src={getFullMediaUrl(card.image)}
                                        minW={{ lg: '346px', md: '400px', base: '158px' }}
                                        borderRadius='4px 0 0 4px'
                                    />
                                </Flex>
                                <Flex
                                    flex='1'
                                    p={{ md: '20px 24px', base: '8px 0px 4px 8px' }}
                                    direction='column'
                                    gap={{ md: '24px', base: '0' }}
                                    maxW={{ base: '154px', sm: '182px', md: '334px' }}
                                    w='100%'
                                >
                                    <Flex justify={{ md: 'space-between', base: 'flex-start' }}>
                                        <Link>
                                            <CategoryTags tagsId={card.categoriesIds} />
                                        </Link>
                                        <Flex
                                            gap='8px'
                                            ml={{ md: '28px', base: '0' }}
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
                                    <Flex
                                        flex='1'
                                        w={{ lg: '274px', base: '100%' }}
                                        h='100px'
                                        direction='column'
                                    >
                                        <Text
                                            fontFamily='var(--font-family)'
                                            fontWeight='500'
                                            fontSize={{ md: '20px', base: '16px' }}
                                            lineHeight='140%'
                                            noOfLines={{ lg: 1, base: 2 }}
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                        >
                                            {card.title}
                                        </Text>
                                        <Flex
                                            flex='1'
                                            display={{ base: 'none', md: 'flex' }}
                                            direction='column'
                                        >
                                            <Text
                                                mt='8px'
                                                fontFamily='var(--font-family)'
                                                fontWeight='400'
                                                fontSize='14px'
                                                lineHeight='143%'
                                                noOfLines={{ lg: 3, base: 4 }}
                                                overflow='hidden'
                                                textOverflow='ellipsis'
                                            >
                                                {card.description}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        justify='flex-end'
                                        gap='8px'
                                        mt='auto'
                                        mr={{ base: '4px', md: '0' }}
                                    >
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
                        <Flex w='100%' justify='center'>
                            {page < (data?.meta?.totalPages || 0) && (
                                <Button
                                    data-test-id='load-more-button'
                                    borderRadius='6px'
                                    padding='0 24px'
                                    maxW={{ lg: '197px', base: '167px' }}
                                    w='100%'
                                    h={{ lg: '48px', base: '40px' }}
                                    maxH='100%'
                                    background='#b1ff2e'
                                    _hover={{
                                        background: 'rgba(177, 255, 46, 0.6)',
                                        border: '1px solid #b1ff2e',
                                    }}
                                    onClick={handleLoadMore}
                                    isDisabled={isDisabledButton}
                                >
                                    <Text
                                        fontWeight='600'
                                        fontSize={{ lg: '18px', base: '16px' }}
                                        lineHeight='150%'
                                    >
                                        {isFetching ? 'Загрузка' : 'Загрузить еще'}
                                        {isFetching ? <Spinner size='sm' ml='12px' /> : ''}
                                    </Text>
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    );
};
