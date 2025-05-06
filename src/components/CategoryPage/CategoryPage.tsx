import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';

import useRecipeFilters from '~/hooks/useRecipeFilters';
import {
    Category,
    useGetCategoriesQuery,
    useGetCategoryQuery,
} from '~/query/services/category-api';

import { Footer } from '../Footer/Footer';
import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { TabComponent } from './TabComponent/TabComponent';

export const CategoryPage = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const { category, subcategory } = useParams();
    const { data: categoryData } = useGetCategoriesQuery();

    const foundCategory = categoryData?.find((cat) => cat.category === category);
    const categoryIdFromSlug = foundCategory?._id;

    const { data, isError } = useGetCategoryQuery(categoryIdFromSlug!);

    console.log(data);

    const [tabIndex, setTabIndex] = useState<number>(0);
    const [fallback, setFallback] = useState<Category | null>(null);
    const [randomCategory, setRandomCategory] = useState<Category | null>(null);
    const [isFilterApplied, setIsFilterApplied] = useState<string | boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!categoryData || !category) return;

        const foundCategory = categoryData.find((cat) => cat.category === category);

        const isCategoryValid = Boolean(foundCategory);
        const isSubcategoryValid = subcategory
            ? foundCategory?.subCategories?.some((sub) => sub.category === subcategory)
            : true;

        if (!isCategoryValid || !isSubcategoryValid) {
            navigate('/not-found', { replace: true });
        }
    }, [categoryData, category, subcategory, navigate]);

    useEffect(() => {
        if (isError && !data) {
            const cached = localStorage.getItem('cachedCategory');
            if (cached) {
                setFallback(JSON.parse(cached));
            }
        }
    }, [isError, data]);

    useEffect(() => {
        const index = data?.subCategories.findIndex((cat) => cat.category === currentPath);
        setTabIndex(index === -1 ? 0 : (index as number));
    }, [currentPath, data?.subCategories]);

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

    useEffect(() => {
        const isApplied =
            excludedIngredients.length > 0 ||
            selectedCategory ||
            selectedMeat.length > 0 ||
            selectedSide.length > 0 ||
            searchQuery.length > 0;

        setIsFilterApplied(!!isApplied);
    }, [excludedIngredients, selectedCategory, selectedMeat, selectedSide, searchQuery]);

    useEffect(() => {
        setSelectedCategory?.('');
        setSelectedMeat?.([]);
        setSelectedSide?.([]);
        setExcludedIngredients?.([]);
    }, [
        category,
        setExcludedIngredients,
        setSearchQuery,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
    ]);

    const dataCategoryPage = data ?? fallback;
    const filterCategory = categoryData?.filter((item) => item.subCategories);

    useEffect(() => {
        if (filterCategory?.length) {
            const random = filterCategory[Math.floor(Math.random() * filterCategory.length)];
            setRandomCategory(random);
        }
    }, [dataCategoryPage]);

    useEffect(() => {
        if (foundCategory && !subcategory && foundCategory.subCategories?.length > 0) {
            const firstSub = foundCategory.subCategories[0];
            navigate(`/${category}/${firstSub.category}`, { replace: true });
        }
    }, [foundCategory, subcategory, navigate, category]);

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
                            scrollbarWidth: 'none' /* Firefox */,
                            '&::-webkit-scrollbar': {
                                display: 'none' /* Chrome, Safari, Edge */,
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

            <Footer footerData={randomCategory} />
        </Flex>
    );
};
