import { Recipe } from '~/components/mockData';

export const getRecipeUrl = (recipe: Recipe) => {
    const mainCategory = recipe.category[0];
    const subCategory = recipe.subcategory[0];

    return `/${mainCategory}/${subCategory}/${recipe.id}`;
};
