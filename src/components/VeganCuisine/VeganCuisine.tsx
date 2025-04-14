import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router';

import { Footer } from '../Footer/Footer';
import { PageHeader } from '../PageHeader/PageHeader';
import { footerVeganCuisineCard, footerVeganCuisineList } from './FooterVeganCuisineData';
import { SecondCourses } from './VeganSecond/VeganSecond';

export const VeganCuisine = () => {
    const [tabIndex, setTabIndex] = useState(2);
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
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
              попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
            />
            <Tabs onChange={setTabIndex} index={tabIndex} align='center'>
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
                            as={Link}
                            to='/vegan-cuisine/second-courses'
                            key={label}
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
                                {label}
                            </Text>
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
};
