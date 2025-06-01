export type Recipe = {
    data: Data[];
    meta: Meta;
};

export type Data = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    proteins: number;
    authorId: string;
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
};

export type CreateRecipe = {
    title: string;
    description: string | null;
    time: number;
    portions: number;
    categoriesIds: string[];
    image: string;
    steps: Step[];
    ingredients: Ingredient[];
};

export type Step = {
    stepNumber: number;
    description: string | null;
    image: string | null;
};

export type NutritionValue = {
    calories: number;
    proteins: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string | null;
    count: number | null;
    measureUnit: string | null;
};

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type GetRecipesQueryArgs = {
    page: number;
    limit: number;
    allergens: string[];
    searchString: string;
    meat: string[];
    garnish: string[];
    subcategoriesIds: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
};

export type GetRecipesParams = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    id: string;
};
export type GetRecipesById = {
    id: string;
};

export type MeasureUnitsResponse = {
    _id: string;
    name: string;
};
