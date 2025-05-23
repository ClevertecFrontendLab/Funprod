import { Category } from '~/query/services/category-api.type';

export function getCategoriesWithSubcategories(categoryData: Category[] | undefined) {
    return categoryData?.filter((item) => item.subCategories);
}
