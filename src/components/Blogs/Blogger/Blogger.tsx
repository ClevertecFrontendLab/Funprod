import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { HTTP_STATUS } from '~/constants/httpStatusCodes';
import { ROUTES } from '~/constants/routes';
import { useGetRecipeByUserIdQuery } from '~/query/services/recipe-api/recipe-api';

import { BloggerInfo } from './BloggerInfo/BloggerInfo';
import { BloggerRecipes } from './BloggerRecipes/BloggerRecipes';
import { Notes } from './Notes/Notes';
import { OtherBloggers } from './OtherBloggers/OtherBloggers';

export const Blogger = () => {
    const { userId } = useParams();
    const bloggerId = userId!;
    const navigate = useNavigate();
    const { data, error } = useGetRecipeByUserIdQuery(bloggerId);

    useEffect(() => {
        if (typeof error === 'object' && error !== null && 'status' in error) {
            if (error?.status === HTTP_STATUS.NOT_FOUND) {
                navigate(ROUTES.NOT_FOUND);
            } else if (error?.status === HTTP_STATUS.SERVER_ERROR) {
                navigate(ROUTES.HOME);
            } else {
                navigate(ROUTES.HOME);
            }
        }
    }, [error, navigate]);

    if (!data) return null;

    const notes = data?.notes || [];

    return (
        <Flex
            w={{
                base: '328px',
                sm: '728px',
                md: '880px',
                lg: '1360px',
            }}
            direction='column'
            m={{ base: '64px 16px 100px 16px', sm: '64px 16px 100px 24px', md: '80px 72px 0 24px' }}
            minH='100vh'
        >
            <BloggerInfo bloggerId={bloggerId} />
            <BloggerRecipes data={data} />
            <Notes notes={notes} />
            <OtherBloggers />
        </Flex>
    );
};
