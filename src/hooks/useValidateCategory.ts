import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api/category-api.type';

type UseValidateCategoryProps = {
    categoryData: Category[] | undefined;
    category: string | undefined;
    subcategory?: string;
};

export const useValidateCategory = ({
    categoryData,
    category,
    subcategory,
}: UseValidateCategoryProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const foundCategory = categoryData?.find((cat) => cat.category === category);
        const isCategoryValid = Boolean(foundCategory);

        const isSubcategoryValid = subcategory
            ? foundCategory?.subCategories?.some((sub) => sub.category === subcategory)
            : true;

        if (!isCategoryValid || !isSubcategoryValid) {
            navigate(ROUTES.NOT_FOUND, { replace: true });
        }
    }, [categoryData, category, subcategory, navigate]);
};
