import { Category } from '~/query/services/category-api.type';

import { generatePageTitles } from './generatePageTitles';

type BreadcrumbItem = { label: string; to: string };

export function getPageData({
    categoryData,
    pathnames,
    id,
    recipeData,
}: {
    categoryData?: Category[];
    pathnames?: string[];
    id?: string;
    recipeData?: { _id: string; title: string };
}): { breadcrumbItems?: BreadcrumbItem[]; pageTitles: Record<string, string> } {
    const dataCategories = categoryData?.filter((item) => item.subCategories);
    const dataSubCategories = categoryData?.filter((item) => !item.subCategories);

    const pageTitles = generatePageTitles(dataCategories, dataSubCategories);

    const breadcrumbItems = pathnames?.reduce<BreadcrumbItem[]>((acc, path, index) => {
        const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        if (fullPath === '/the-juiciest') {
            acc.push({ label: 'Самое сочное', to: fullPath });
            return acc;
        }

        if (isLast) {
            if (id && recipeData && recipeData._id === id) {
                acc.push({ label: recipeData.title, to: fullPath });
                return acc;
            }
        }

        acc.push({ label: pageTitles[fullPath] || path, to: fullPath });
        return acc;
    }, []);

    return { breadcrumbItems, pageTitles };
}
