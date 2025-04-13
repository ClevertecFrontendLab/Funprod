import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

const pageTitles: Record<string, string> = {
    '/': 'Главная',
    '/vegan-cuisine': 'Веганская кухня',
    '/vegan-cuisine/second-courses': 'Вторые блюда',
    '/juiciest': 'Самое сочное',
};
export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbItems = pathnames.map((path, index) => {
        const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
        return {
            label: pageTitles[fullPath] || path,
            to: fullPath,
        };
    });

    breadcrumbItems.unshift({ label: 'Главная', to: '/' });

    return (
        <Breadcrumb separator={<ChevronRightIcon w='22px' h='24px' />}>
            {breadcrumbItems.map((item, index) => (
                <BreadcrumbItem
                    key={item.to}
                    isCurrentPage={index === breadcrumbItems.length - 1}
                    sx={{}}
                >
                    <BreadcrumbLink as={Link} to={item.to}>
                        <Text
                            fontSize='16px'
                            fontWeight='400'
                            lineHeight='150$'
                            textAlign='center'
                            color={
                                index === breadcrumbItems.length - 1
                                    ? '#000'
                                    : 'rgba(0, 0, 0, 0.64)'
                            }
                        >
                            {item.label}
                        </Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
