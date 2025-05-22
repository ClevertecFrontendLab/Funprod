import { Flex, Image, Link, Text } from '@chakra-ui/react';

import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import iconButton from './../../assets/actionBar/IconButton.svg';
import peopleFill from './../../assets/actionBar/PeopleFill.svg';

const socialPanel = [
    { count: 185, icon: bookmarkHeart },
    { count: 589, icon: peopleFill },
    { count: 587, icon: emojiHeartEyes },
];
export const AsideBar = () => (
    <Flex
        display={{ base: 'none', md: 'flex' }}
        direction='column'
        justifyContent='space-between'
        mt={{ md: '80px', base: '0' }}
        zIndex='1'
        w={{ md: '208px', base: '0' }}
        position='relative'
    >
        <Flex
            direction='column'
            alignItems='center'
            justify='center'
            position='fixed'
            gap='24px'
            w={{ base: '203px', md: '208px' }}
            p={{ base: '0 16px', md: '16px 56px' }}
            h={{ base: '24px', md: '200px' }}
            fontFamily='var(--font-family)'
            fontWeight='600'
            fontSize='16px'
            lineHeight='150%'
            color='var(--lime-600)'
        >
            {socialPanel.map((item, index) => (
                <Flex gap='8px' key={index}>
                    <Image
                        src={item.icon}
                        w={{ base: '10px', md: '16px' }}
                        h={{ base: '12px', md: '16px' }}
                    />
                    <Text
                        fontWeight='600'
                        fontSize={{ base: '12px', md: '16px' }}
                        lineHeight='133%'
                        color='var(--lime-600)'
                    >
                        {item.count}
                    </Text>
                </Flex>
            ))}
        </Flex>
        <Flex
            position='fixed'
            bottom='0'
            display={{ base: 'none', md: 'flex' }}
            direction='column'
            justify='center'
            align='center'
            w='208px'
            h='208px'
            background='radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.6) 0%, rgba(255, 255, 255, 0) 100%)'
        >
            <Link
                href='/'
                display='flex'
                flexDirection='column'
                alignItems='center'
                gap='12px'
                p='0px 12px'
            >
                <Image src={iconButton} w='48px' h='48px' />
                <Text fontWeight='400' fontSize='12px' lineHeight='133%'>
                    Записать рецепт
                </Text>
            </Link>
        </Flex>
    </Flex>
);
