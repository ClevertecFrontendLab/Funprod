export const ENDPOINTS = {
    RECIPE: 'recipe',
    RECIPE_CATEGORY: (id: string) => `recipe/category/${id}`,
    RECIPE_BY_ID: (id: string) => `recipe/${id}`,
    RECIPE_LIKE: (id: string) => `recipe/${id}/like`,
    RECIPE_BOOKMARK: (id: string) => `recipe/${id}/bookmark`,
    RECIPE_DRAFT: 'recipe/draft',
    MEASURE_UNITS: 'measure-units',
};
