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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { Category } from '~/query/services/category-api.type';
import { categoriesSelector, setSelectedCategoryId } from '~/store/app-slice';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { Breadcrumbs } from '../Header/Breadcrumbs/Breadcrumbs';
import arrowDown from './../../assets/sidebar/arrowDown.svg';
import arrowUp from './../../assets/sidebar/arrowUp.svg';
import exit from './../../assets/sidebar/exit.svg';

type SidebarProps = {
    openBurger?: boolean;
    onClose?: () => void;
};

export const Sidebar = ({ openBurger, onClose }: SidebarProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const location = useLocation();
    const currentPath = location.pathname;
    const categoryDataRedux = useSelector(categoriesSelector);
    const dispatch = useDispatch();

    const handleAccordionButton = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCategoryClick = (categoryId: string) => {
        dispatch(setSelectedCategoryId(categoryId));
    };
    const sidebarCategory = useCategoriesWithSubcategories(categoryDataRedux);

    return (
        <Flex
            data-test-id='nav'
            display={{ base: openBurger ? 'flex' : 'none', md: 'flex' }}
            p={openBurger ? '0' : '14px 4px 0 0'}
            w={{ md: '256px', base: '0' }}
        >
            <Box
                borderRadius={{ base: '0 0 12px 12px', md: 'none' }}
                background='#fff'
                position='fixed'
                left={{ md: '0', lg: 'unset' }}
                top={{ md: '80px', base: '64px' }}
                right={openBurger ? '5px' : 'unset'}
                h={{ md: '100vh', sm: '868px', base: '652px' }}
                w={{ md: '256px', sm: '344px', base: '336px' }}
                boxShadow={{
                    md: '0 2px 1px -1px rgba(0, 0, 0, 0.2),0 1px 1px 0 rgba(0, 0, 0, 0.14),0 1px 3px 0 rgba(0, 0, 0, 0.12)',
                    base: '0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)background: #fff',
                }}
                overflowY={{ sm: 'hidden', base: 'auto' }}
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
                zIndex='1'
            >
                {openBurger && <Breadcrumbs onClose={onClose} />}
                <Flex
                    direction='column'
                    height={{ md: 'calc(100vh - 64px)', sm: '868px', base: '652px' }}
                >
                    <Flex
                        flex='1'
                        borderRadius='12px'
                        p='10px 16px 10px 10px'
                        mt={{ sm: '24px', base: '12px' }}
                        minHeight={{ md: '644px', sm: '660px', base: 'auto' }}
                        maxHeight={{ md: '872px', sm: '660px', base: 'none' }}
                        overflowY={{ sm: 'auto' }}
                        overflowX={{ sm: 'hidden' }}
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
                                ? {
                                      md: ' 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                      base: 'none',
                                  }
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
                            allowMultiple={false}
                        >
                            {sidebarCategory?.map((section, index) => (
                                <AccordionItem
                                    data-test-id={
                                        section.title === 'Веганская кухня'
                                            ? 'vegan-cuisine'
                                            : undefined
                                    }
                                    key={index}
                                    w={{ md: '230px', sm: '314px', base: '302px' }}
                                    minHeight='48px'
                                    border='none'
                                    margin='0'
                                    padding='0'
                                >
                                    <h2>
                                        <AccordionButton
                                            onClick={() => {
                                                handleAccordionButton(index);
                                            }}
                                            display='flex'
                                            justifyContent='space-between'
                                            margin='0'
                                            padding='0'
                                            maxWidth={{ md: '230px', base: '314px' }}
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
                                                    src={getFullMediaUrl(section.icon)}
                                                    alt={section.title}
                                                    boxSize='24px'
                                                />
                                                <ChakraLink
                                                    as={Link}
                                                    onClick={() => handleCategoryClick(section._id)}
                                                    to={`${section.category}/${section.subCategories[0].category}`}
                                                >
                                                    <Text ml='8px' fontSize='16px'>
                                                        {section.title}
                                                    </Text>
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
                                            {section.subCategories.map(
                                                (item: Category, i: number) => {
                                                    const isActive =
                                                        currentPath ===
                                                        `/${section.category}/${item.category}`;
                                                    return (
                                                        <ListItem key={i}>
                                                            <ChakraLink
                                                                data-test-id={
                                                                    isActive
                                                                        ? `${item.category}-active`
                                                                        : ''
                                                                }
                                                                as={Link}
                                                                onClick={() =>
                                                                    handleCategoryClick(section._id)
                                                                }
                                                                to={`/${section.category}/${item.category}`}
                                                                fontWeight={
                                                                    isActive ? '700' : '400'
                                                                }
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    width: '230px',
                                                                    height: '36px',
                                                                    marginLeft: '0',

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
                                                                        width: isActive
                                                                            ? '8px'
                                                                            : '1px',
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
                                                                {item.title}
                                                            </ChakraLink>
                                                        </ListItem>
                                                    );
                                                },
                                            )}
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Flex>
                    <Flex
                        flexDirection='column'
                        mt={{ md: 'auto', base: '12px' }}
                        p='0px 24px 32px 24px'
                    >
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
                            noOfLines={3}
                            whiteSpace='wrap'
                        >
                            Все права защищены, ученический файл,
                            <br /> ©Клевер Технолоджи, 2025
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
