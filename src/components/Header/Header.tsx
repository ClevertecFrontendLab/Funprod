import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, Image, Link, Text } from '@chakra-ui/react';

import Avatar from './../../assets/header/avatar.svg';
import headerLogo from './../../assets/header/logo.svg';
import headerLogoMobile from './../../assets/header/logoMobile.svg';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';

export const Header = () => (
    <Flex
        data-test-id='header'
        as='header'
        align='center'
        justify='space-between'
        w='100%'
        height='80px'
        bg='var(--lime-50)'
        color='black'
        position='fixed'
        zIndex='1'
        top='0'
        left='0'
        px={{ base: '20px', md: '24px' }}
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
            />
        </Link>
        <Flex as='nav' flex='1' display={{ base: 'none', md: 'block' }} ml='128px'>
            <Breadcrumbs />
        </Flex>
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
        <Button
            display={{ base: 'block', md: 'none' }}
            w='48px'
            h='48px'
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            ml=''
        >
            <Icon as={HamburgerIcon} w='24px' h='24px' />
        </Button>
    </Flex>
);
