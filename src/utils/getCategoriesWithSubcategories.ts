import { Category } from '~/query/services/category-api.type';

export function getCategoriesWithSubcategories(categoryData: Category[] | undefined): Category[] {
    if (!Array.isArray(categoryData)) return [];
    return categoryData.filter((item) => item.subCategories);
}
