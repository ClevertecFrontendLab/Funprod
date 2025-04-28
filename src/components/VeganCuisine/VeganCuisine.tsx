import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router';

import useRecipeFilters from '~/hooks/useRecipeFilters';

import { Footer } from '../Footer/Footer';
// import { SecondCourses } from './VeganSecond/VeganSecond';
import { Recipe } from '../mockData';
import { PageHeader } from '../PageHeader/PageHeader';
import { footerVeganCuisineCard, footerVeganCuisineList } from './FooterVeganCuisineData';
import { Snacks } from './Snacks/Snacks';

const categories = [
    { label: 'Закуски', path: 'snacks' },
    { label: 'Первые блюда', path: 'first-dish' },
    { label: 'Вторые блюда', path: 'second-dish' },
    { label: 'Гарниры', path: 'side-dishes' },
    { label: 'Десерты', path: 'desserts' },
    { label: 'Выпечка', path: 'baked-goods' },
    { label: 'Сыроедческие блюда', path: 'raw-dishes' },
    { label: 'Напитки', path: 'drinks' },
];

export const VeganCuisine = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const tabIndex = categories.findIndex((cat) => cat.path === currentPath);

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
    } = useRecipeFilters();

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
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
              попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
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
            />
            <Tabs index={tabIndex === -1 ? 0 : tabIndex} align='start'>
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
                    {categories.map((item, i) => (
                        <Tab
                            as={Link}
                            data-test-id={`tab-${item.path}-${i}`}
                            to={`/vegan/${item.path}`}
                            key={item.label}
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
                                {item.label}
                            </Text>
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {categories.map((item, i) => {
                        const data = filteredRecipes.filter((card: Recipe) =>
                            card.subcategory.includes(item.path),
                        );
                        return (
                            <TabPanel key={i} p='0'>
                                {tabIndex === i && (
                                    <Snacks
                                        filteredData={data}
                                        searchQuery={searchQuery}
                                        categories={item.path}
                                    />
                                )}
                            </TabPanel>
                        );
                    })}
                </TabPanels>
            </Tabs>

            <Footer
                title='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. 
            Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
                card={footerVeganCuisineCard}
                list={footerVeganCuisineList}
            />
        </Flex>
    );
};
