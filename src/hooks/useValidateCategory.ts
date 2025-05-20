import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Category } from '~/query/services/category-api.type';

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
        if (!categoryData || categoryData.length === 0 || !category) return;

        const foundCategory = categoryData.find((cat) => cat.category === category);
        const isCategoryValid = Boolean(foundCategory);

        const isSubcategoryValid = subcategory
            ? foundCategory?.subCategories?.some((sub) => sub.category === subcategory)
            : true;

        if (!isCategoryValid || !isSubcategoryValid) {
            navigate('/not-found', { replace: true });
        }
    }, [categoryData, category, subcategory, navigate]);
};
