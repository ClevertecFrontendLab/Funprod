import { Category } from '~/query/services/category-api.type';

type CheckAndNavigateProps = {
    categoriesIds: string[];
    categoryData: Category[];
};

export const checkAndNavigate = ({ categoryData, categoriesIds }: CheckAndNavigateProps) => {
    const dataCategories = categoryData?.filter((item) => item.subCategories);

    const dataSubCategories = categoryData?.filter((item) => !item.subCategories);
    const matchedSubcategory = dataSubCategories?.find((sub) => categoriesIds.includes(sub._id));
    const matchedCategory = dataCategories?.find(
        (cat) => cat._id === matchedSubcategory?.rootCategoryId,
    );

    const condition =
        !dataSubCategories || !dataCategories || !matchedSubcategory || !matchedCategory;

    return { condition, matchedSubcategory, matchedCategory };
};
