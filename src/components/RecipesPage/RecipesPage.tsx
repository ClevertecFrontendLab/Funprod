import { Flex, Spinner } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useGetRecipeByIdQuery } from '~/query/services/recipe-api/recipe-api';
import { recipeIdSelector } from '~/store/app-slice';

import { NewRecipesSection } from '../Main/NewRecipesSection/NewRecipesSection';
import { NewRecipe } from '../NewRecipe/NewRecipe';
import { Author } from './Author/Author';
import { CalorieInfo } from './CalorieInfo/CalorieInfo';
import { CookingSteps } from './RecipeHeader/CookingSteps/CookingSteps';
import { IngredientsTable } from './RecipeHeader/IngredientsTable/IngredientsTable';
import { RecipeHeader } from './RecipeHeader/RecipeHeader';
export const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipeId = useSelector(recipeIdSelector);
    const { data, error, isError, isLoading } = useGetRecipeByIdQuery(
        id === recipeId ? skipToken : { id: id! },
    );
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (isError && error) {
            sessionStorage.setItem('error', 'Попробуйте немного позже');
            const timer = setTimeout(() => {
                navigate(-1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isError, error, dispatch, navigate]);

    if (!data || data._id !== id || isLoading) {
        return <Spinner />;
    }

    if (editMode) {
        return (
            <NewRecipe
                dataForEditing={data}
                editMode={editMode}
                setEditMode={setEditMode}
                id={data?._id}
            />
        );
    }
    return (
        <>
            {(data || !editMode) && (
                <Flex
                    maxW={{
                        base: '328px',
                        sm: '728px',
                        md: '860px',
                        lg: '1340px',
                    }}
                    w='100%'
                    direction='column'
                    m={{
                        base: '64px 16px 100px 16px',
                        sm: '64px 20px 100px 20px',
                        md: '80px 72px 0 24px',
                    }}
                    minH='100vh'
                >
                    <RecipeHeader data={data} setEditMode={setEditMode} />
                    <CalorieInfo data={data} />
                    <IngredientsTable data={data} />
                    <CookingSteps data={data} />
                    <Author bloggerId={data.authorId} />
                    <NewRecipesSection />
                </Flex>
            )}
        </>
    );
};
