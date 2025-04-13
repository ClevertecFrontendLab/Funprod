import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/icons';
import { Link } from 'react-router';

import { Footer } from '../Footer/Footer';
import { PageHeader } from '../PageHeader/PageHeader';
import { footerVeganCuisineCard, footerVeganCuisineList } from './FooterVeganCuisineData';
import { SecondCourses } from './VeganSecond/VeganSecond';

export const VeganCuisine = () => (
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
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
              попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
        />
        <Tabs align='center' defaultIndex={2} mt='32px'>
            <TabList
                w={{ base: '100%', lg: 'fit-content' }}
                overflow='hidden'
                overflowX='auto'
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
            >
                {[
                    'Закуски',
                    'Первые блюда',
                    'Вторые блюда',
                    'Гарниры',
                    'Десерты',
                    'Выпечка',
                    'Сыроедческие блюда',
                    'Напитки',
                ].map((label) => (
                    <Tab
                        key={label}
                        _selected={{
                            color: 'var(--lime-600)',
                            borderBottom: '2px solid var(--lime-600)',
                        }}
                        borderBottom='2px solid transparent'
                        whiteSpace='nowrap'
                    >
                        <Link to='/vegan-cuisine/second-courses'>{label}</Link>
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel p='0'>
                    <SecondCourses />
                </TabPanel>
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
