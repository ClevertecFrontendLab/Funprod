import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { mockData, Recipe } from '~/components/mockData';

const pageTitles: Record<string, string> = {
    '/': 'Главная',
    '/vegan': 'Веганская кухня',
    '/vegan/snacks': 'Закуски',
    '/vegan/first-dish': 'Первые блюда',
    '/vegan/second-dish': 'Вторые блюда',
    '/vegan/side-dishes': 'Гарниры',
    '/vegan/desserts': 'Десерты',
    '/vegan/baked-goods': 'Выпечка',
    '/vegan/raw-dishes': 'Сыроедческие блюда',
    '/vegan/drinks': 'Напитки',
    '/the-juiciest': 'Самое сочное',
    '/juiciest': 'Самое сочное',
    '/second-dish': 'Вторые блюда',
    '/second-dish/poultry-dish': 'Из птицы',
    '/salads': 'Салаты',
    '/salads/warm-salads': 'Теплые салаты',
};

export const Breadcrumbs = ({ onClose = () => {} }: { onClose?: () => void }) => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter(Boolean);

    const breadcrumbItems = pathnames.reduce<Array<{ label: string; to: string }>>(
        (acc, path, index) => {
            const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const isNumber = !isNaN(Number(path));
            if (isLast && isNumber) {
                const recipe = mockData.find((card: Recipe) => card.id === path);
                return [
                    ...acc,
                    {
                        label: recipe?.title || 'Загрузка...',
                        to: fullPath,
                    },
                ];
            }
            return [
                ...acc,
                {
                    label: pageTitles[fullPath] || path,
                    to: fullPath,
                },
            ];
        },
        [],
    );

    breadcrumbItems.unshift({ label: 'Главная', to: '/' });

    return (
        <Box
            width={{ base: '300px', md: '100%' }}
            overflow='hidden'
            ml={{ md: '0', base: '20px' }}
            display={{ base: 'block', md: 'block' }}
        >
            <Flex wrap='wrap' gap='2px' maxWidth='100%'>
                {breadcrumbItems.map((item, index) => (
                    <Flex key={`${item.to}-${index}`} align='center' justify='center'>
                        <Link to={item.to}>
                            <Text
                                data-test-id='breadcrumbs'
                                fontSize='16px'
                                fontWeight={index === breadcrumbItems.length - 1 ? '500' : '400'}
                                color={
                                    index === breadcrumbItems.length - 1
                                        ? '#000'
                                        : 'rgba(0, 0, 0, 0.64)'
                                }
                                whiteSpace='wrap'
                                _hover={{ textDecoration: 'none' }}
                                onClick={() => onClose()}
                            >
                                {item.label}
                            </Text>
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                            <ChevronRightIcon
                                mx='4px'
                                w={{ md: '22px', base: '18px' }}
                                h={{ md: '24px', base: '18px' }}
                                flexShrink={0}
                            />
                        )}
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
