import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useGetBloggersQuery } from '~/query/services/bloggers-api/bloggers-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

import { NewRecipesSection } from '../Main/NewRecipesSection/NewRecipesSection';
import { Bloggers } from './Bloggers/Bloggers';
import { Favorites } from './Favorites/Favorites';

export const Blogs = () => {
    const navigate = useNavigate();
    const userId = getUserIdFromToken();
    const [limit, setLimit] = useState<string>('9');

    const { data, refetch, isError } = useGetBloggersQuery({ currentUserId: userId, limit });

    useEffect(() => {
        if (isError) {
            navigate(ROUTES.HOME);
        }
    }, [isError, navigate]);

    if (!data) return null;
    if (!data.others) return null;

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
        >
            <Text
                fontWeight='700'
                fontSize={{ md: '48px', base: '24px' }}
                lineHeight='100%'
                color='#000'
                textAlign='center'
                mt='32px'
            >
                Кулинарные блоги
            </Text>
            <Favorites bloggers={data.favorites} />
            <Bloggers
                bloggers={data.others}
                fromUserId={userId}
                refetch={refetch}
                limit={limit}
                setLimit={setLimit}
            />
            <NewRecipesSection />
        </Flex>
    );
};
