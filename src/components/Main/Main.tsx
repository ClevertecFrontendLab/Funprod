import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import useRecipeFilters from '~/hooks/useRecipeFilters';
import { useGetCategoriesQuery } from '~/query/services/category-api';
import { Category } from '~/query/services/category-api.type';

import { Footer } from '../Footer/Footer';
import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { CookingBlogsSection } from './CookingBlogsSection/CookingBlogsSection';
import { JuiciestSection } from './JuiciestSection/JuiciestSection';
import { NewRecipesSection } from './NewRecipesSection/NewRecipesSection';

export const Main = () => {
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
        setCategoriesIds,
        allergens,
        meat,
        side,
    } = useRecipeFilters();

    const [isFilterApplied, setIsFilterApplied] = useState<string | boolean>(false);
    const { data: categoryData } = useGetCategoriesQuery();
    const [randomCategory, setRandomCategory] = useState<Category | null>(null);
    const filterCategory = categoryData?.filter((item) => item.subCategories);
    const [isLoading, setIsLoading] = useState(false);
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
        if (filterCategory?.length) {
            const random = filterCategory[Math.floor(Math.random() * filterCategory.length)];
            setRandomCategory(random);
        }
    }, [filterCategory]);
    return (
        <Flex
            maxW={{
                base: '328px',
                sm: '728px',
                md: '880px',
                lg: '1360px',
            }}
            w='100%'
            direction='column'
            m={{ base: '64px 16px 100px 16px', sm: '64px 16px 100px 24px', md: '80px 72px 0 24px' }}
        >
            <PageHeader
                title='Приятного аппетита!'
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
                filterCategory={filterCategory}
                categoriesIds={categoriesIds}
                setCategoriesIds={setCategoriesIds}
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
                <NewRecipesSection categoryData={categoryData!} />
            )}
            <JuiciestSection categoryData={categoryData} />
            <CookingBlogsSection />
            <Footer footerData={randomCategory} />
        </Flex>
    );
};
