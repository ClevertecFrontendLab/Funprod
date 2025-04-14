import { Button, Flex, Image, Text } from '@chakra-ui/react';

import main from './../../assets/footerMobile/main.svg';
import profile from './../../assets/footerMobile/profile.svg';
import search from './../../assets/footerMobile/search.svg';
import write from './../../assets/footerMobile/write.svg';

const buttonList = [
    {
        icon: main,
        title: 'Главная',
    },
    {
        icon: search,
        title: 'Поиск',
    },
    {
        icon: write,
        title: 'Записать',
    },
    {
        icon: profile,
        title: 'Мой профиль',
    },
];

export const FooterMobile = () => (
    <Flex
        data-test-id='footer'
        position='fixed'
        bottom='0'
        maxH='84px'
        h='100%'
        w='100%'
        bgColor='var(--lime-50)'
    >
        {buttonList.map((item, index) => (
            <Button
                key={index}
                maxW='192px'
                w='100%'
                h='100%'
                // bg='transparent'
                bg={
                    index === 0
                        ? 'radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 1) 0%, rgba(255, 255, 255, 0) 100%)'
                        : 'transparent'
                }
                // _hover={{
                // }}
            >
                <Flex
                    direction='column'
                    align='center'
                    // bg='radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 1) 0%, rgba(255, 255, 255, 0) 100%)'
                >
                    <Image src={item.icon} alt={item.title} w='40px' h='40px' />
                    <Text fontWeight='500' fontSize='12px' lineHeight='133%' textAlign='center'>
                        {item.title}
                    </Text>
                </Flex>
            </Button>
        ))}
    </Flex>
);
