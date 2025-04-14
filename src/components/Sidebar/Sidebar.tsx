import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Image,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import arrowDown from './../../assets/sidebar/arrowDown.svg';
import arrowUp from './../../assets/sidebar/arrowUp.svg';
import exit from './../../assets/sidebar/exit.svg';
import { sidebarMenu } from './data';

export const Sidebar = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null); // отслеживаем индекс открытого аккордеона
    const location = useLocation();
    const currentPath = location.pathname;
    const handleAccordionButton = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Flex display={{ base: 'none', md: 'flex' }} p='14px 4px 0 0' w='256px'>
            <Box
                background='#fff'
                position='fixed'
                top='80px'
                h='100vh'
                w='256px'
                boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2),
            0 1px 1px 0 rgba(0, 0, 0, 0.14),
            0 1px 3px 0 rgba(0, 0, 0, 0.12)'
            >
                <Flex direction='column' height='calc(100vh - 80px)'>
                    <Flex
                        flex='1'
                        borderRadius='12px'
                        p='10px 16px 10px 10px'
                        mt='24px'
                        minHeight='644px'
                        maxHeight='872px'
                        overflowY='auto'
                        overflowX='hidden'
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '8px',
                                borderRadius: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(0, 0, 0, 0.04)',
                                borderRadius: '4px',
                                m: '10px 0',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 0, 0, 0.16)',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0, 0, 0, 0.2)',
                            },
                        }}
                        boxShadow={
                            openIndex !== null
                                ? ' 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                : 'none'
                        }
                    >
                        <Accordion
                            index={openIndex !== null ? [openIndex] : []}
                            onChange={(index) => {
                                if (Array.isArray(index)) {
                                    setOpenIndex(index[0] ?? null);
                                } else {
                                    setOpenIndex(index);
                                }
                            }}
                            allowMultiple
                        >
                            {sidebarMenu.map((section, index) => (
                                <AccordionItem
                                    key={index}
                                    w='230px'
                                    minHeight='48px'
                                    border='none'
                                    margin='0'
                                    padding='0'
                                >
                                    <h2>
                                        <AccordionButton
                                            data-test-id={
                                                section.title === 'Веганская кухня'
                                                    ? 'vegan-cuisine'
                                                    : undefined
                                            }
                                            onClick={() => {
                                                handleAccordionButton(index);
                                            }}
                                            display='flex'
                                            justifyContent='space-between'
                                            margin='0'
                                            padding='0'
                                            maxWidth='230px'
                                            height='48px'
                                            borderRadius='0'
                                            _expanded={{ bg: '#eaffc7', fontWeight: '700' }}
                                            _hover={{
                                                bg: '#eaffc7',
                                                borderColor: 'transparent',
                                                fontWeight: '700',
                                            }}
                                            _focus={{
                                                outline: 'none',
                                                fontWeight: '700',
                                                border: 'none',
                                                boxShadow: 'none',
                                                borderColor: 'transparent',
                                            }}
                                            _focusVisible={{
                                                bg: '#eaffc7',
                                                outline: 'none',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Box
                                                as='span'
                                                display='flex'
                                                alignItems='center'
                                                flex='1'
                                                textAlign='left'
                                                ml='8px'
                                            >
                                                <Image
                                                    src={section.IconUrl}
                                                    alt={section.title}
                                                    boxSize='24px'
                                                />
                                                <ChakraLink as={Link} to='/vegan-cuisine'>
                                                    <Text ml='8px'>{section.title}</Text>
                                                </ChakraLink>
                                            </Box>

                                            {openIndex === index ? (
                                                <Image src={arrowUp} mr='12px' />
                                            ) : (
                                                <Image src={arrowDown} mr='12px' />
                                            )}
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel padding={0} margin={0}>
                                        <List>
                                            {section.items.map((item, i) => {
                                                const isActive = currentPath === item.path;
                                                return (
                                                    <ListItem key={i}>
                                                        <ChakraLink
                                                            as={Link}
                                                            to={item.path}
                                                            fontWeight={isActive ? '700' : '400'}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                width: '230px',
                                                                height: '36px',
                                                                marginLeft: '0',
                                                                position: 'relative',

                                                                _hover: {
                                                                    textDecoration: 'none',
                                                                    color: 'inherit',
                                                                    fontWeight: '700',
                                                                    '::before': {
                                                                        width: '8px',
                                                                        height: '28px',
                                                                        marginLeft: '33px',
                                                                    },
                                                                },
                                                                '::before': {
                                                                    content: '""',
                                                                    display: 'inline-block',
                                                                    width: isActive ? '8px' : '1px',
                                                                    height: isActive
                                                                        ? '28px'
                                                                        : '24px',
                                                                    backgroundColor: '#c4ff61',
                                                                    margin: isActive
                                                                        ? '0 11px 0 33px'
                                                                        : '2px 11px 2px 40px',
                                                                    transition:
                                                                        'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </ChakraLink>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Flex>
                    <Flex flexDirection='column' mt='auto' p='0px 24px 32px 24px'>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='500'
                            fontSize='12px'
                            lineHeight='133%'
                            color='rgba(0, 0, 0, 0.24)'
                            mb='16px'
                        >
                            Версия программы 03.25
                        </Text>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='400'
                            fontSize='12px'
                            lineHeight='133%'
                            color='rgba(0, 0, 0, 0.64)'
                            mb='16px'
                        >
                            Все права защищены,
                            <br />
                            ученический файл, <br />
                            ©Клевер Технолоджи, 2025
                        </Text>
                        <ChakraLink
                            as={Link}
                            fontFamily='var(--font-family)'
                            fontWeight='600'
                            fontSize='12px'
                            lineHeight='133%'
                            color='#000'
                            _hover={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                            href=''
                        >
                            <Flex align='center' justify='flex-start'>
                                <Image src={exit} alt='exit' mr='6px' w='12px' h='12px' />
                                Выйти
                            </Flex>
                        </ChakraLink>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
