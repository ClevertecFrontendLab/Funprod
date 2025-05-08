import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

import { useFilterCheck } from '~/hooks/useFilterCheck';
import { useLocalFallback } from '~/hooks/useLocalFallback';
import useRecipeFilters from '~/hooks/useRecipeFilters';
import { useRedirectToFirstSubcategory } from '~/hooks/useRedirectToFirstSubcategory';
import { useResetFiltersOnCategoryChange } from '~/hooks/useResetFiltersOnCategoryChange';
import { useTabIndex } from '~/hooks/useTabIndex';
import { useValidateCategory } from '~/hooks/useValidateCategory';
import { useGetCategoryQuery } from '~/query/services/category-api';
import { categoriesSelector } from '~/store/app-slice';

import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { TabComponent } from './TabComponent/TabComponent';

export const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const categoryData = useSelector(categoriesSelector);
    const foundCategory = categoryData?.find((cat) => cat.category === category);
    const categoryIdFromSlug = foundCategory?._id;

    const { data, isError } = useGetCategoryQuery(categoryIdFromSlug!);

    const [isLoading, setIsLoading] = useState(false);

    const fallback = useLocalFallback('cachedCategory', isError, data);

    const dataCategoryPage = data ?? fallback;
    const filterCategory = categoryData?.filter((item) => item.subCategories);

    useValidateCategory({ categoryData, category, subcategory });
    const { tabIndex, setTabIndex } = useTabIndex(data?.subCategories);

    const {
        filteredRecipes,
        excludedIngredients,
        setExcludedIngredients,
        selectedCategory,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
        selectedSide,
        selectedMeat,
        searchQuery,
        setSearchQuery,
        setCategoriesIds,
        categoriesIds,
        allergens,
        meat,
        side,
    } = useRecipeFilters();

    const isFilterApplied = useFilterCheck({
        excludedIngredients,
        searchQuery,
        selectedCategory,
        selectedMeat,
        selectedSide,
    });

    useResetFiltersOnCategoryChange({
        category,
        setExcludedIngredients,
        setSearchQuery,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
    });

    useRedirectToFirstSubcategory({ category, subcategory, foundCategory });

    return (
        <Flex
            w={{
                base: '328px',
                sm: '728px',
                md: '880px',
                lg: '1360px',
            }}
            direction='column'
            m={{ base: '64px 16px 100px 16px', sm: '64px 16px 100px 24px', md: '80px 72px 0 24px' }}
        >
            <PageHeader
                title={dataCategoryPage?.title}
                description={dataCategoryPage?.description}
                selectedOptions={excludedIngredients}
                onChange={setExcludedIngredients}
                setSelectedCategory={setSelectedCategory}
                setSelectedSide={setSelectedSide}
                setSelectedMeat={setSelectedMeat}
                selectedCategory={selectedCategory}
                filteredData={filteredRecipes}
                selectedMeat={selectedMeat}
                selectedSide={selectedSide}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                categoriesIds={categoriesIds}
                setCategoriesIds={setCategoriesIds}
                filterCategory={filterCategory}
                isLoading={isLoading}
            />

            {isFilterApplied ? (
                <SearchFilter
                    filteredData={filterCategory}
                    categoryData={categoryData!}
                    searchQuery={searchQuery}
                    categoriesIds={categoriesIds}
                    allergens={allergens}
                    meat={meat}
                    garnish={side}
                    onLoadingChange={(val) => setIsLoading(val)}
                />
            ) : (
                <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} align='start'>
                    <TabList
                        maxW={{ base: '328px', sm: '880px', lg: 'fit-content' }}
                        overflowX='auto'
                        overflowY='hidden'
                        sx={{
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                        }}
                    >
                        {dataCategoryPage?.subCategories.map((item, i) => (
                            <Tab
                                as={Link}
                                data-test-id={`tab-${item.category}-${item.category === 'side-dishes' ? 1 : i}`}
                                to={`/${dataCategoryPage.category}/${item.category}`}
                                key={`${item._id}`}
                                _selected={{
                                    color: 'var(--lime-600)',
                                    borderBottom: '4px solid var(--lime-600)',
                                }}
                                whiteSpace='nowrap'
                            >
                                <Text
                                    fontSize={{ md: '16px', base: '14px' }}
                                    fontWeight='500'
                                    lineHeight='150%'
                                    textAlign='center'
                                >
                                    {item.title}
                                </Text>
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {data?.subCategories.map((item, i) => (
                            <TabPanel key={item._id} p='0'>
                                {tabIndex === i && (
                                    <TabComponent
                                        searchQuery={searchQuery}
                                        categoriesId={item._id}
                                        dataCategory={data}
                                    />
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            )}
        </Flex>
    );
};
