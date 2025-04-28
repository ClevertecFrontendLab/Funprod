import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { CustomSelectDrawer } from '../CustomSelect/CustomSelectDrawer';
import { mockData } from '../mockData';
import drawerClose from './../../assets/drawerClose.svg';

const categoryTranslations: Record<string, string> = {
    vegan: 'Веганская кухня',
    'second-dish': 'Вторые блюда',
    snacks: 'Закуски',
    vegetables: 'Овощные блюда',
    italian: 'Итальянская кухня',
    national: 'Национальное',
    'side-dishes': 'Гарниры',
    salads: 'Салаты',
};

const meat = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];
const sideDish = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

export const DrawerComponent = ({
    isOpen,
    onClose,
    onChange = () => {},
    setSelectedCategory,
    setSelectedSide,
    setSelectedMeat,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedOptions?: string[];
    onChange?: (val: string[]) => void;
    setSelectedCategory?: (val: string) => void;
    setSelectedSide?: (val: string[]) => void;
    setSelectedMeat?: (val: string[]) => void;
    selectedCategory?: string;
    selectedMeat: string[];
    selectedSide: string[];
}) => {
    const [isActive, setIsActive] = useState(true);
    const [localCategory, setLocalCategory] = useState('');
    const [localMeat, setLocalMeat] = useState<string[]>([]);
    const [localSide, setLocalSide] = useState<string[]>([]);
    const [localAllergens, setLocalAllergens] = useState<string[]>([]);

    const categories = Array.from(new Set(mockData.flatMap((item) => item.category)));

    const handleSearch = () => {
        setSelectedCategory?.(localCategory);
        setSelectedMeat?.(localMeat);
        setSelectedSide?.(localSide);
        onChange?.(localAllergens);
        setLocalAllergens([]);
        setLocalMeat([]);
        setLocalSide([]);
        setLocalCategory('');
        onClose();
    };

    const handleReset = () => {
        setSelectedCategory?.('');
        setSelectedMeat?.([]);
        setSelectedSide?.([]);
        setLocalAllergens([]);
        setLocalMeat([]);
        setLocalSide([]);
        setLocalCategory('');
        onChange?.([]);
    };
    const isFindRecipeDisabled =
        !localSide.length && !localAllergens.length && !localCategory.length;

    return (
        <Drawer data-test-id='filter-drawer' placement='right' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay bg='rgba(255, 255, 255, 0.1)' backdropFilter='blur(2px)' />
            <DrawerContent
                maxW={{ md: '463px', base: '344px' }}
                w='100%'
                data-test-id='filter-drawer'
            >
                <Flex justify='space-between' m='32px' align='center'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%'>
                        Фильтр
                    </Text>
                    <IconButton
                        data-test-id='close-filter-drawer'
                        aria-label='Close button'
                        icon={<img src={drawerClose} />}
                        onClick={onClose}
                        bg='transparent'
                        minW='24px'
                        w='24px'
                        h='24px'
                    />
                </Flex>
                <DrawerBody display='flex' flexDirection='column' gap='24px'>
                    <Menu>
                        <MenuButton
                            textAlign='start'
                            as={Button}
                            data-test-id='filter-menu-button-категория'
                            rightIcon={<ChevronDownIcon />}
                            bg='transparent'
                            _hover={{ bg: 'transparent' }}
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            minH='40px'
                        >
                            <Text fontWeight='400' fontSize='16px' lineHeight='150%'>
                                {categoryTranslations[localCategory] || 'Категория'}
                            </Text>
                        </MenuButton>
                        <MenuList mt='0'>
                            {categories.map((category) => (
                                <MenuItem
                                    key={category}
                                    onClick={() => setLocalCategory(category)}
                                    minW='100%'
                                >
                                    <Checkbox
                                        data-test-id={
                                            category === 'vegan'
                                                ? 'checkbox-веганская кухня'
                                                : undefined
                                        }
                                    >
                                        {categoryTranslations[category] || category}
                                    </Checkbox>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            textAlign='start'
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            bg='transparent'
                            _hover={{ bg: 'transparent' }}
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            minH='40px'
                        >
                            <Text fontWeight='400' fontSize='16px' lineHeight='150%'>
                                Поиск по автору
                            </Text>
                        </MenuButton>
                    </Menu>
                    <Flex direction='column' gap='12px'>
                        <Text>Тип мяса:</Text>
                        <CheckboxGroup
                            value={localMeat}
                            colorScheme='green'
                            onChange={(newValues) => setLocalMeat(newValues as string[])}
                        >
                            <Stack direction='column'>
                                {meat.map((item) => (
                                    <Checkbox key={item} value={item}>
                                        {item}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </Flex>
                    <Flex direction='column' gap='12px'>
                        <Text>Тип гарнира:</Text>
                        <CheckboxGroup
                            value={localSide}
                            colorScheme='green'
                            onChange={(newValues) => setLocalSide(newValues as string[])}
                        >
                            <Stack direction='column'>
                                {sideDish.map((item) => (
                                    <Checkbox
                                        key={item}
                                        value={item}
                                        data-test-id={
                                            item === 'Картошка' ? 'checkbox-картошка' : ''
                                        }
                                    >
                                        {item}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </Flex>
                    <Flex align='center' mt='6px' maxW='233px' w='100%'>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='500'
                            fontSize='16px'
                            lineHeight='150%'
                            textAlign='center'
                            mr='12px'
                            whiteSpace='nowrap'
                        >
                            Исключить аллергены
                        </Text>
                        <Switch
                            data-test-id='allergens-switcher-filter'
                            mr='16px'
                            w='34px'
                            h='20px'
                            onChange={(e) => setIsActive(!e.target.checked)}
                            colorScheme='#b1ff2e'
                            _checked={{
                                bg: '#b1ff2e',
                                borderRadius: '9999px',
                            }}
                        />
                    </Flex>
                    <Flex>
                        <CustomSelectDrawer
                            isActive={isActive}
                            selectedOptions={localAllergens}
                            onChange={(newSelectedOptions) => {
                                setLocalAllergens(newSelectedOptions);
                            }}
                            allFilters={[
                                ...(localCategory
                                    ? [categoryTranslations[localCategory] || localCategory]
                                    : []),
                                ...localMeat,
                                ...localSide,
                                ...localAllergens,
                            ]}
                            isOpenDrawer={isOpen}
                        />
                    </Flex>
                    <Flex m='14px 0 32px  32px' gap='8px'>
                        <Button
                            data-test-id='clear-filter-button'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ md: '205px', base: '146px' }}
                            h={{ md: '48px', base: '32px' }}
                            bg=' rgba(255, 255, 255, 0.06)'
                            onClick={() => handleReset()}
                        >
                            <Text
                                fontWeight='600'
                                fontSize={{ md: '18px', base: '14px' }}
                                lineHeight='156%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                Очистить фильтр
                            </Text>
                        </Button>
                        <Button
                            data-test-id='find-recipe-button'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ md: '172px', base: '121px' }}
                            h={{ md: '48px', base: '32px' }}
                            bg=' rgba(0, 0, 0, 0.92)'
                            onClick={() => handleSearch()}
                            isDisabled={isFindRecipeDisabled}
                            _disabled={{ pointerEvents: 'none', bg: 'gray' }}
                        >
                            <Text
                                fontWeight='600'
                                fontSize={{ md: '18px', base: '14px' }}
                                lineHeight='156%'
                                color='#fff'
                            >
                                Найти рецепт
                            </Text>
                        </Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
