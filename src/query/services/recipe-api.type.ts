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

export type Step = {
    stepNumber: number;
    description: string;
    image: string;
};

export type NutritionValue = {
    calories: number;
    proteins: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
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
