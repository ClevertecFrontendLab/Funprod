import { useState } from 'react';

import { mockData, Recipe } from './../components/mockData';

export const allergenKeywords: Record<string, string[]> = {
    'Томат (помидор)': ['томат', 'томатный', 'помидор'],
    Гриб: ['гриб', 'грибы'],
    'Молочные продукты': ['молоко', 'сыр', 'сливки', 'кефир', 'творог'],
    лук: ['лук', 'луковый', 'луковицы'],
};

const sideDishTranslations: Record<string, string> = {
    Картошка: 'potatoes',
    Гречка: 'Buckwheat',
    Паста: 'Pasta',
    Спагетти: 'Spaghetti',
    Рис: 'Rice',
    Капуста: 'Cabbage',
    Фасоль: 'Beans',
    'Другие овощи': 'Other Vegetables',
};

const useRecipeFilters = () => {
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMeat, setSelectedMeat] = useState<string[]>([]);
    const [selectedSide, setSelectedSide] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriesIds, setCategoriesIds] = useState<string[]>([]);

    const allergens = excludedIngredients.flatMap((item) => {
        const match = item.match(/^(.+?)\s*\((.+?)\)/);
        if (match) {
            const [, first, second] = match;
            return [first.trim().toLowerCase(), second.trim().toLowerCase()];
        }
        return [item.trim().toLowerCase()];
    });
    const meat = selectedMeat.map((item) => item.split('(')[0].trim().toLowerCase());
    const side = selectedSide.map((item) => item.split('(')[0].trim().toLowerCase());

    const selectedSideTranslations = (side: string) => sideDishTranslations[side] || side;

    const isRecipeAllowed = (recipe: Recipe, excludedAllergens: string[]) =>
        !excludedAllergens.some((inputAllergen) => {
            const allergenKey = Object.keys(allergenKeywords).find(
                (key) => key.toLowerCase() === inputAllergen.toLowerCase(),
            );

            const keywords = allergenKey ? allergenKeywords[allergenKey] : [inputAllergen];

            return keywords.some((keyword) =>
                recipe.ingredients.some((ingredient) =>
                    ingredient.title.toLowerCase().includes(keyword.toLowerCase()),
                ),
            );
        });

    const filteredRecipes = mockData.filter((recipe) => {
        const meatMatches =
            selectedMeat.length === 0 || (recipe.meat && selectedMeat.includes(recipe.meat));

        const sideMatches =
            selectedSide.length === 0 ||
            (recipe.side &&
                selectedSide.some((side) => selectedSideTranslations(side) === recipe.side));

        const categoryMatches =
            selectedCategory === '' ||
            (recipe.category && recipe.category.includes(selectedCategory));

        const allergensMatch = isRecipeAllowed(recipe, excludedIngredients);

        const searchMatches = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

        return meatMatches && sideMatches && categoryMatches && allergensMatch && searchMatches;
    });

    return {
        filteredRecipes,
        excludedIngredients,
        setExcludedIngredients,
        selectedCategory,
        setSelectedCategory,
        selectedMeat,
        setSelectedMeat,
        selectedSide,
        setSelectedSide,
        searchQuery,
        setSearchQuery,
        categoriesIds,
        setCategoriesIds,
        allergens,
        meat,
        side,
    };
};

export default useRecipeFilters;
