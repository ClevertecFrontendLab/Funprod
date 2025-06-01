import { Button, Image, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import draft from '~/assets/newRecipe/draft.svg';

type EditRecipeButtonProps = {
    setEditMode: (editMode: boolean) => void;
};
export const EditRecipeButton = ({ setEditMode }: EditRecipeButtonProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        setEditMode(true);
        navigate(`/edit-recipe${location.pathname}`);
    };

    return (
        <Button
            w={{ lg: '246px', sm: '200px', base: '180px' }}
            h={{ lg: '48px', md: '32px', base: '24px' }}
            borderRadius='6px'
            border='1px solid rgba(0, 0, 0, 0.48)'
            bg='rgba(255, 255, 255, 0.06)'
            onClick={handleClick}
            leftIcon={<Image src={draft} w='11px' h='14px' />}
        >
            <Text
                fontWeight='600'
                fontSize={{ lg: '18px', md: '14px', base: '12px' }}
                lineHeight='156%'
                color=' rgba(0, 0, 0, 0.8)'
            >
                Редактировать рецепт
            </Text>
        </Button>
    );
};
