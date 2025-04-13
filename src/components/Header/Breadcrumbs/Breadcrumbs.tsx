import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
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
        <Breadcrumb separator='>'>
            {breadcrumbItems.map((item, index) => (
                <BreadcrumbItem key={item.to} isCurrentPage={index === breadcrumbItems.length - 1}>
                    <BreadcrumbLink
                        href='/'
                        fontSize='16px'
                        fontWeight='400'
                        _hover={{ color: 'gray.600' }}
                        as={Link}
                        to={item.to}
                    >
                        {item.label}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
