import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/category-api';

type CategoryTagsProps = {
    tagsId: string[] | undefined;
};

export const CategoryTags = ({ tagsId }: CategoryTagsProps) => {
    const { data } = useGetCategoriesQuery();
    const categoryFilter = data?.filter((item) => !item.subCategories);
    return (
        <Flex
            direction='column'
            gap='6px'
            top='8px'
            left='8px'
            position={{
                md: 'static',
                base: 'absolute',
            }}
        >
            {tagsId?.map((id) => {
                const filterId = categoryFilter?.filter((item) => item._id === id);
                return filterId?.map((item, i) => (
                    <Link to='/' key={i}>
                        <Flex
                            w='100%'
                            h='24px'
                            p={{
                                md: '2px 8px',
                                base: '2px 4px',
                            }}
                            borderRadius='4px'
                            background='var(--lime-150)'
                            gap={{ md: '8px', base: '2px' }}
                        >
                            <Image src={item.icon} />
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                whiteSpace='nowrap'
                            >
                                {item?.title}
                            </Text>
                        </Flex>
                    </Link>
                ));
            })}
        </Flex>
    );
};
