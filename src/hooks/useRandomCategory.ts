import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { Category } from '~/query/services/category-api/category-api.type';

export const useRandomCategory = (categories?: Category[] | null) => {
    const [randomCategory, setRandomCategory] = useState<Category | null>(null);
    const { category } = useParams();
    const hasCategoryChangedRef = useRef<string | undefined>(category);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (!category && isFirstLoad.current) {
            isFirstLoad.current = true;
            if (categories?.length) {
                const random = categories[Math.floor(Math.random() * categories.length)];
                setRandomCategory(random);
            }
        } else if (categories?.length && category !== hasCategoryChangedRef.current) {
            const random = categories[Math.floor(Math.random() * categories.length)];
            setRandomCategory(random);
            hasCategoryChangedRef.current = category;
        }
    }, [categories, category]);

    return randomCategory;
};
