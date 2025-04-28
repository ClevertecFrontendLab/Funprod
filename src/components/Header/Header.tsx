import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, Image, Link, Text } from '@chakra-ui/react';

import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import peopleFill from './../../assets/actionBar/PeopleFill.svg';
import Avatar from './../../assets/header/avatar.svg';
import headerLogo from './../../assets/header/logo.svg';
import headerLogoMobile from './../../assets/header/logoMobile.svg';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';

const socialPanel = [
    { count: 185, icon: bookmarkHeart },
    { count: 589, icon: peopleFill },
    { count: 587, icon: emojiHeartEyes },
];

type HeaderProps = {
    openBurger: boolean;
    onToggle: () => void;
};

export const Header = ({ openBurger, onToggle }: HeaderProps) => (
    <Flex
        data-test-id='header'
        as='header'
        align='center'
        justify='space-between'
        w='100%'
        height={{ md: '80px', base: '64px' }}
        bg={openBurger ? '#fff' : 'var(--lime-50)'}
        color='black'
        position='fixed'
        zIndex='15'
        top='0'
        left='0'
        right='0'
        px={{ base: '8px', md: '24px' }}
    >
        <Link href='/' _hover={{ textDecoration: 'none' }}>
            <Image
                display={{ base: 'none', sm: 'block' }}
                src={headerLogo}
                alt='Логотип сайта'
                width='136px'
                height='32px'
            />
            <Image
                display={{ base: 'block', sm: 'none' }}
                src={headerLogoMobile}
                alt='Логотип сайта'
                width='32px'
                height='32px'
                position='absolute'
                top='16px'
                left='16px'
                zIndex='5'
            />
        </Link>
        {!openBurger && (
            <Flex as='nav' flex='1' display={{ base: 'none', md: 'block' }} ml='128px'>
                <Breadcrumbs />
            </Flex>
        )}
        <Flex align='center' width='432px' height='48px' display={{ base: 'none', md: 'flex' }}>
            <Image
                src={Avatar}
                alt='Аватар пользователя'
                width='48px'
                height='48px'
                borderRadius='full'
            />
            <Box ml='12px'>
                <Text fontSize='18px' fontWeight='500' color='black'>
                    Екатерина Константинопольская
                </Text>
                <Text fontSize='14px' fontWeight='400' color='rgba(0, 0, 0, 0.64)'>
                    @bake_and_pie
                </Text>
            </Box>
        </Flex>
        <Flex align='center' display={{ base: 'flex', md: 'none' }}>
            {!openBurger && (
                <Flex
                    alignItems='center'
                    justify='center'
                    gap='24px'
                    w='203px'
                    h='24px'
                    fontFamily='var(--font-family)'
                    fontWeight='600'
                    fontSize='16px'
                    lineHeight='150%'
                    color='var(--lime-600)'
                >
                    {socialPanel.map((item, index) => (
                        <Flex gap='8px' key={index}>
                            <Image src={item.icon} w='10px' h='12px' />
                            <Text
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color='var(--lime-600)'
                            >
                                {item.count}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex direction='column' align='flex-end'>
                {!openBurger ? (
                    <Button
                        data-test-id='hamburger-icon'
                        w='48px'
                        h='48px'
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        onClick={onToggle}
                        aria-label='Open menu'
                    >
                        <Icon
                            as={HamburgerIcon}
                            w={openBurger ? '12px' : '24px'}
                            h={openBurger ? '12px' : '24px'}
                        />
                    </Button>
                ) : (
                    <Button
                        data-test-id='close-icon'
                        w='48px'
                        h='48px'
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        onClick={onToggle}
                        aria-label='Close menu'
                    >
                        <Icon
                            as={CloseIcon}
                            w={openBurger ? '12px' : '24px'}
                            h={openBurger ? '12px' : '24px'}
                        />
                    </Button>
                )}
            </Flex>
        </Flex>
    </Flex>
);
