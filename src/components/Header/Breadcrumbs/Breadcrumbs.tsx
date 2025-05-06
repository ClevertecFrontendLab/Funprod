import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { Category, useGetCategoriesQuery } from '~/query/services/category-api';
import { useGetRecipeByIdQuery } from '~/query/services/recipe-api';

const generatePageTitles = (
    dataCategories: Category[] | undefined,
    dataSubCategories: Category[] | undefined,
): Record<string, string> => {
    const pageTitles: Record<string, string> = {};
    dataCategories?.forEach((category) => {
        pageTitles[`/${category.category}`] = category.title;
        const categorySubcategories = dataSubCategories?.filter(
            (sub) => sub.rootCategoryId === category._id,
        );
        categorySubcategories?.forEach((subcategory) => {
            pageTitles[`/${category.category}/${subcategory.category}`] = `${subcategory.title}`;
        });
    });

    return pageTitles;
};

type Breadcrumbs = { onClose?: () => void };

export const Breadcrumbs = ({ onClose = () => {} }: Breadcrumbs) => {
    const location = useLocation();
    const { id } = useParams();
    console.log(id);
    const { data: recipeData } = useGetRecipeByIdQuery({ id: id! });
    const { data: categoryData } = useGetCategoriesQuery();

    const pathnames = location.pathname.split('/').filter(Boolean);

    const dataCategories = categoryData?.filter((item) => item.subCategories);
    const dataSubCategories = categoryData?.filter((item) => !item.subCategories);

    const pageTitles = generatePageTitles(dataCategories, dataSubCategories);
    const breadcrumbItems = pathnames.reduce<Array<{ label: string; to: string }>>(
        (acc, path, index) => {
            const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            if (fullPath === '/the-juiciest') {
                return [
                    ...acc,
                    {
                        label: 'Самое сочное',
                        to: fullPath,
                    },
                ];
            }

            if (isLast) {
                if (id && recipeData && recipeData._id === id) {
                    return [
                        ...acc,
                        {
                            label: recipeData.title,
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
