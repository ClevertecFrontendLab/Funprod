import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api.type';
import { useGetRecipeByIdQuery } from '~/query/services/recipe-api';
import { categoriesSelector, recipeIdSelector } from '~/store/app-slice';
import { getBreadcrumb } from '~/utils/getBreadcrumb';

type Breadcrumbs = { onClose?: () => void };

export const Breadcrumbs = ({ onClose = () => {} }: Breadcrumbs) => {
    const location = useLocation();
    const { id } = useParams();
    const recipeId = useSelector(recipeIdSelector);
    const { data: recipeData } = useGetRecipeByIdQuery({ id: id! }, { skip: id === recipeId });
    const categoryData = useSelector(categoriesSelector);
    const pathnames = location.pathname.split('/').filter(Boolean);
    const data = localStorage.getItem('categories');
    const { breadcrumbItems } = getBreadcrumb({
        categoryData: data ? JSON.parse(data) : categoryData,
        pathnames,
        id,
        recipeData,
    });

    breadcrumbItems?.unshift({ label: 'Главная', to: ROUTES.HOME });

    const updatedBreadcrumbItems = breadcrumbItems?.map((item, index) => {
        if (index === 0 || index === breadcrumbItems.length - 1) return item;

        const categorySlug = item.to.split('/')[1];
        const allCategories: Category[] = data ? JSON.parse(data) : categoryData;

        const category = allCategories?.find((cat) => cat.category === categorySlug);

        if (category?.subCategories && category.subCategories.length > 0) {
            const firstSub = category.subCategories[0];
            return {
                ...item,
                to: `/${category.category}/${firstSub.category}`,
            };
        }

        return item;
    });

    return (
        <Box
            width={{ base: '300px', md: '100%' }}
            overflow='hidden'
            ml={{ md: '0', base: '20px' }}
            display={{ base: 'block', md: 'block' }}
        >
            <Flex wrap='wrap' gap='2px' maxWidth='100%'>
                {updatedBreadcrumbItems?.map((item, index) => (
                    <Flex key={`${item.to}-${index}`} align='center' justify='center'>
                        <Link to={item.to}>
                            <Text
                                data-test-id='breadcrumbs'
                                fontSize='16px'
                                fontWeight={
                                    index === updatedBreadcrumbItems.length - 1 ? '500' : '400'
                                }
                                color={
                                    index === updatedBreadcrumbItems.length - 1
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
                        {index < updatedBreadcrumbItems.length - 1 && (
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
