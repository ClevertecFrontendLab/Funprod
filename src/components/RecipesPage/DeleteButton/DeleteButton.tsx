import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useDeleteRecipeMutation } from '~/query/services/recipe-api';

export const DeleteButton = ({ id }: { id: string }) => {
    const [deleteRecipe, { data }] = useDeleteRecipeMutation();
    const navigate = useNavigate();

    const handleClick = () => {
        deleteRecipe(id);
    };

    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data, navigate]);
    return (
        <>
            <IconButton
                data-test-id='recipe-delete-button'
                icon={<DeleteIcon w='12px' h='14px' />}
                aria-label='Удалить ингредиент'
                onClick={handleClick}
                minW='0px'
                w='32px'
                h='32px'
                p='0'
                bg='transparent'
            />
        </>
    );
};
