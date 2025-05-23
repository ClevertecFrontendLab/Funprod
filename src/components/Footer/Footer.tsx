import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import { useRandomCategory } from '~/hooks/useRandomCategory';
import { Category } from '~/query/services/category-api.type';
import { useGetRecipesCategoryQuery } from '~/query/services/recipe-api';

import { CategoryTags } from '../CategoryPage/TabComponent/CategoryTags/CategoryTags';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';

type FooterProps = {
    footerData: Category[] | null;
    footerCategoryId?: string;
};

export const Footer = ({ footerData }: FooterProps) => {
    const randomCategory = useRandomCategory(footerData!);
    const footerSubCategoryId = randomCategory?.subCategories[0]._id;
    const { data } = useGetRecipesCategoryQuery(
        {
            id: footerSubCategoryId!,
            limit: 5,
        },
        { skip: !footerSubCategoryId },
    );
    const firstFooterCategory = Array.isArray(data?.data) && data.data.slice(0, 2);
    const secondFooterCategory = Array.isArray(data?.data) && data.data.slice(2, 5);

    return (
        <Flex
            direction='column'
            maxWidth='1340px'
            w={{ lg: '100%', sm: '728px' }}
            mt={{ md: '40px', base: '0' }}
            gap='24px'
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
            ml='24px'
            mb={{ md: '0', base: '94px' }}
        >
            <Flex
                justify='space-between'
                gap={{ md: '24px', base: '12px' }}
                direction={{ md: 'row', base: 'column' }}
                mt={{ base: '8px', md: '24px' }}
            >
                <Text
                    flex='1'
                    fontFamily='var(--font-family)'
                    fontWeight='500'
                    fontSize={{ lg: '48px', md: '36px', base: '24px' }}
                    lineHeight='111%'
                    whiteSpace='wrap'
                >
                    {randomCategory?.title}
                </Text>
                <Text
                    flex={{ lg: '1', base: '2' }}
                    fontFamily='var(--font-family)'
                    fontWeight='500'
                    fontSize={{ md: '16px', base: '14px' }}
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {randomCategory?.description}
                </Text>
            </Flex>
            <Flex
                direction={{ sm: 'row', base: 'column' }}
                gap={{ lg: '24px', md: '16px', base: '12px' }}
            >
                {Array.isArray(firstFooterCategory) &&
                    firstFooterCategory.map((card, index) => (
                        <Flex
                            key={index}
                            direction='column'
                            borderRadius='8px'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            w={{ lg: '322px', md: '282px', sm: '232px', base: '328px' }}
                            h={{ lg: '192px', md: '180px', base: '168px' }}
                            p={{ lg: '24px', base: '16px' }}
                        >
                            <Flex
                                direction='column'
                                w={{ lg: '274px', md: '250px', sm: '208px', base: '272px' }}
                                gap='8px'
                            >
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='500'
                                    fontSize={{ md: '20px', base: '16px' }}
                                    lineHeight='150%'
                                    noOfLines={1}
                                >
                                    {card.title}
                                </Text>
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                    noOfLines={3}
                                >
                                    {card.description}
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt='24px'>
                                <CategoryTags tagsId={card.categoriesIds.slice(0, 1)} />
                                <Flex gap='8px' align='flex-start'>
                                    <Flex align='center' justify='center' gap='7px' p='0 4px'>
                                        <Box w='12px' h='12px'>
                                            <Image src={bookmarkHeart} />
                                        </Box>
                                        <Text
                                            fontFamily='var(--font-family)'
                                            fontWeight='600'
                                            fontSize='12px'
                                            lineHeight='133%'
                                            color='var(--lime-600)'
                                        >
                                            {card.bookmarks}
                                        </Text>
                                    </Flex>
                                    <Flex align='center' justify='center' gap='7px' p='0 4px'>
                                        <Box w='12px' h='12px'>
                                            <Image src={emojiHeartEyes} />
                                        </Box>
                                        <Text
                                            fontFamily='var(--font-family)'
                                            fontWeight='600'
                                            fontSize='12px'
                                            lineHeight='133%'
                                            color='var(--lime-600)'
                                        >
                                            {card.likes}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                <Flex direction='column' gap={{ md: '12px', sm: '6px', base: '12px' }}>
                    {Array.isArray(secondFooterCategory) &&
                        secondFooterCategory.map((list, index) => (
                            <Flex
                                key={index}
                                border='1px solid rgba(0, 0, 0, 0.08);'
                                borderRadius='8px'
                                w={{ lg: '668px', md: '282px', sm: '240px', base: '328px' }}
                                h={{ lg: '56px', base: '52px' }}
                                align='center'
                                justify='space-between'
                                gap={{ lg: '12px', md: '8px', base: '6px' }}
                            >
                                <Flex gap={{ lg: '12px', base: '6px' }}>
                                    <Image ml={{ lg: '24px', base: '12px' }} />
                                    <Text
                                        fontFamily='var(--font-family)'
                                        fontWeight='500'
                                        fontSize={{ lg: '20px', base: '18px' }}
                                        lineHeight='140%'
                                        noOfLines={1}
                                    >
                                        {list.title}
                                    </Text>
                                </Flex>
                                <Button
                                    mr={{ lg: '24px', base: '12px' }}
                                    maxW={{ lg: '87px', base: '70px' }}
                                    w='100%'
                                    h={{ md: '32px', base: '24px' }}
                                    border='1px solid var(--lime-600)'
                                    bg='transparent'
                                    color='var(--lime-600)'
                                >
                                    <Text
                                        fontWeight='600'
                                        fontSize={{ lg: '14px', base: '12px' }}
                                        lineHeight='143%'
                                    >
                                        Готовить
                                    </Text>
                                </Button>
                            </Flex>
                        ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
