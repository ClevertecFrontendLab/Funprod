import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import useRecipeFilters from '~/hooks/useRecipeFilters';

import { Footer } from '../Footer/Footer';
import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { CookingBlogsSection } from './CookingBlogsSection/CookingBlogsSection';
import { footerMainCard, footerMainList } from './FooterMainData';
import { JuiciestSection } from './JuiciestSection/JuiciestSection';
import { NewRecipesSection } from './NewRecipesSection/NewRecipesSection';

export const allergenKeywords: Record<string, string[]> = {
    'Томат (помидор)': ['томат', 'томатный', 'помидор'],
    грибы: ['гриб', 'грибы', 'шампиньоны', 'лисички', 'вешенки'],
    'Молочные продукты': ['молоко', 'сыр', 'сливки', 'кефир', 'творог'],
};

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
    } = useRecipeFilters();

    const [isFilterApplied, setIsFilterApplied] = useState<string | boolean>(false);

    useEffect(() => {
        const isApplied =
            excludedIngredients.length > 0 ||
            selectedCategory ||
            selectedMeat.length > 0 ||
            selectedSide.length > 0 ||
            searchQuery.length > 0;

        setIsFilterApplied(!!isApplied);
    }, [excludedIngredients, selectedCategory, selectedMeat, selectedSide, searchQuery]);

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
            />
            {isFilterApplied ? (
                <SearchFilter filteredData={filteredRecipes} searchQuery={searchQuery} />
            ) : (
                <NewRecipesSection filteredData={filteredRecipes} />
            )}
            <JuiciestSection />
            <CookingBlogsSection />
            <Footer
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                card={footerMainCard}
                list={footerMainList}
            />
        </Flex>
    );
};
