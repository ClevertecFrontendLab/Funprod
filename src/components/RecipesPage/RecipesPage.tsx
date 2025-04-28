import {
    Box,
    Button,
    Flex,
    Image,
    Link,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { categoryIcon } from '../categoryIcon';
import { NewRecipesSection } from '../Main/NewRecipesSection/NewRecipesSection';
import { mockData } from '../mockData';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import authorRecipe from './../../assets/AuthorRecipe.jpg';
import leftIcon from './../../assets/leftIcon.svg';
import peopleIcon from './../../assets/peopleIcon.svg';
import time from './../../assets/time.svg';

export const RecipePage = () => {
    const { category, subcategory, id } = useParams();
    const recipe = mockData.find(
        (recipe) =>
            recipe.id === id &&
            recipe.category.includes(category ?? '') &&
            recipe.subcategory.includes(subcategory ?? ''),
    );

    const [servings, setServings] = useState(recipe?.portions || 1);

    const handleChange = (valueAsString: string, valueAsNumber: number) => {
        setServings(valueAsNumber || 1);
        valueAsString;
    };

    const scaledIngredients = recipe?.ingredients.map((ingredient) => {
        const basePortions = recipe.portions || 1;
        const scaledCount = (parseFloat(ingredient.count) * servings) / basePortions;

        return {
            ...ingredient,
            count: Number.isNaN(scaledCount) ? ingredient.count : scaledCount,
        };
    });

    return (
        <Flex
            maxW={{
                base: '328px',
                sm: '728px',
                md: '880px',
                lg: '1360px',
            }}
            w='100%'
            direction='column'
            m={{ base: '64px 16px 100px 16px', sm: '64px 20px 100px 20px', md: '80px 72px 0 24px' }}
        >
            <Flex
                p={{ sm: '56px 0px 32px 0px', base: '0' }}
                w='100%'
                direction={{ sm: 'row', base: 'column' }}
            >
                <Image
                    src={recipe?.image}
                    alt={recipe?.title}
                    w={{ lg: '553px', md: '353px', sm: '232px', base: '328px' }}
                    h={{ md: '410px', base: '224px' }}
                    objectFit='cover'
                    borderRadius='8px'
                />

                <Flex
                    direction='column'
                    ml={{ md: '24px', sm: '16px', base: '0' }}
                    w='100%'
                    mt={{ sm: '0', base: '16px' }}
                >
                    <Flex justify='space-between'>
                        <Flex
                            gap={{ md: '10px', base: '8px' }}
                            top='8px'
                            left='8px'
                            wrap='wrap'
                            w={{ lg: '100%', md: '376px' }}
                        >
                            {categoryIcon
                                .filter((item) => recipe?.category.includes(item.label))
                                .map((item, index) => (
                                    <Link key={index}>
                                        <Flex
                                            w='100%'
                                            h='24px'
                                            p={{ md: '2px 8px', base: '2px 4px' }}
                                            borderRadius='4px'
                                            background='var(--lime-50)'
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
                                                {item.title}
                                            </Text>
                                        </Flex>
                                    </Link>
                                ))}
                        </Flex>
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
                                    {recipe?.bookmarks}
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
                                    {recipe?.likes}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex direction='column' gap={{ md: '24px', base: '16px' }} mt='32px'>
                        <Text
                            fontWeight='700'
                            fontSize={{ md: '48px', base: '24px' }}
                            lineHeight='100%'
                        >
                            {recipe?.title}
                        </Text>
                        <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                            {recipe?.description}
                        </Text>
                    </Flex>
                    <Flex
                        align={{ sm: 'flex-end', base: 'flex-start' }}
                        gap={{ sm: '0', base: '12px' }}
                        justify='space-between'
                        mt={{ sm: 'auto', base: '24px' }}
                        direction={{ sm: 'row', base: 'column' }}
                    >
                        <Flex
                            w='104px'
                            h='24px'
                            align='center'
                            justify='center'
                            bg=' rgba(0, 0, 0, 0.06)'
                            borderRadius='4px'
                            gap='8px'
                        >
                            <Image src={time} w='16px' h='16px' />
                            <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                {recipe?.time}
                            </Text>
                        </Flex>
                        <Flex gap={{ lg: '16px', base: '12px' }} align='center' justify='center'>
                            <Button
                                w={{ lg: '219px', md: '160px', base: '132px' }}
                                h={{ lg: '48px', md: '32px', base: '24px' }}
                                borderRadius='6px'
                                border='1px solid rgba(0, 0, 0, 0.48)'
                                bg='rgba(255, 255, 255, 0.06)'
                            >
                                <Image src={emojiHeartEyes} mr='8px' />
                                <Text
                                    fontWeight='600'
                                    fontSize={{ lg: '18px', md: '14px', base: '12px' }}
                                    lineHeight='156%'
                                    color=' rgba(0, 0, 0, 0.8)'
                                >
                                    Оценить рецепт
                                </Text>
                            </Button>
                            <Button
                                w={{ lg: '273px', md: '202px', base: '168px' }}
                                h={{ lg: '48px', md: '32px', base: '24px' }}
                                borderRadius='6px'
                                bg='#b1ff2e'
                            >
                                <Image src={bookmarkHeart} mr='8px' />
                                <Text
                                    fontWeight='600'
                                    fontSize={{ lg: '18px', md: '14px', base: '12px' }}
                                    lineHeight='156%'
                                    color=' rgba(0, 0, 0, 0.8)'
                                >
                                    Сохранить в закладки
                                </Text>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex direction='column' align='center' mt='40px'>
                <Flex direction='column' align='flex-start'>
                    <Text
                        fontWeight='400'
                        fontSize='14px'
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.8)'
                    >
                        * Калорийность на 1 порцию
                    </Text>

                    <Flex
                        gap={{ lg: '24px', base: '12px' }}
                        mt='20px'
                        direction={{ sm: 'row', base: 'column' }}
                    >
                        <Flex
                            direction={{ sm: 'column', base: 'row' }}
                            gap='12px'
                            border=' 1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='16px'
                            align='center'
                            justify={{ sm: 'center', base: 'flex-start' }}
                            p={{ base: '0 12px', sm: '0' }}
                            w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                            h={{ sm: '136px', base: '64px' }}
                        >
                            <Text
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.48)'
                                textAlign={{ base: 'start', sm: 'center' }}
                                w={{ base: '117px', sm: '100%' }}
                            >
                                калорийность
                            </Text>
                            <Text
                                fontWeight='500'
                                fontSize={{ sm: '36px', base: '24px' }}
                                lineHeight='111%'
                                color='#134b00'
                                textAlign='center'
                                w={{ base: '117px', sm: '100%' }}
                            >
                                {recipe?.nutritionValue.calories}
                            </Text>
                            <Text
                                fontWeight='600'
                                fontSize={{ sm: '14px', base: '12px' }}
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                ККАЛ
                            </Text>
                        </Flex>
                        <Flex
                            direction={{ sm: 'column', base: 'row' }}
                            gap='12px'
                            border=' 1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='16px'
                            align='center'
                            justify={{ sm: 'center', base: 'flex-start' }}
                            p={{ base: '0 12px', sm: '0' }}
                            w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                            h={{ sm: '136px', base: '64px' }}
                        >
                            <Text
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.48)'
                                textAlign={{ base: 'start', sm: 'center' }}
                                w={{ base: '117px', sm: '100%' }}
                            >
                                белки
                            </Text>
                            <Text
                                fontWeight='500'
                                fontSize={{ sm: '36px', base: '24px' }}
                                lineHeight='111%'
                                color='#134b00'
                                textAlign='center'
                                w={{ base: '117px', sm: '100%' }}
                            >
                                {recipe?.nutritionValue.proteins}
                            </Text>
                            <Text
                                fontWeight='600'
                                fontSize={{ sm: '14px', base: '12px' }}
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                ГРАММ
                            </Text>
                        </Flex>
                        <Flex
                            direction={{ sm: 'column', base: 'row' }}
                            gap='12px'
                            border=' 1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='16px'
                            align='center'
                            justify={{ sm: 'center', base: 'flex-start' }}
                            p={{ base: '0 12px', sm: '0' }}
                            w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                            h={{ sm: '136px', base: '64px' }}
                        >
                            <Text
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.48)'
                                textAlign={{ base: 'start', sm: 'center' }}
                                w={{ base: '117px', sm: '100%' }}
                            >
                                жиры
                            </Text>
                            <Text
                                fontWeight='500'
                                fontSize={{ sm: '36px', base: '24px' }}
                                lineHeight='111%'
                                color='#134b00'
                                textAlign='center'
                                w={{ base: '117px', sm: '100%' }}
                            >
                                {recipe?.nutritionValue.fats}
                            </Text>
                            <Text
                                fontWeight='600'
                                fontSize={{ sm: '14px', base: '12px' }}
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                ГРАММ
                            </Text>
                        </Flex>
                        <Flex
                            direction={{ sm: 'column', base: 'row' }}
                            gap='12px'
                            border=' 1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='16px'
                            align='center'
                            justify={{ sm: 'center', base: 'flex-start' }}
                            p={{ base: '0 12px', sm: '0' }}
                            w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                            h={{ sm: '136px', base: '64px' }}
                        >
                            <Text
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.48)'
                                textAlign={{ base: 'start', sm: 'center' }}
                                w={{ base: '117px', sm: '100%' }}
                            >
                                углеводы
                            </Text>
                            <Text
                                fontWeight='500'
                                fontSize={{ sm: '36px', base: '24px' }}
                                lineHeight='111%'
                                color='#134b00'
                                textAlign='center'
                                w={{ base: '117px', sm: '100%' }}
                            >
                                {recipe?.nutritionValue.carbohydrates}
                            </Text>
                            <Text
                                fontWeight='600'
                                fontSize={{ sm: '14px', base: '12px' }}
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                ГРАММ
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex mt='40px' direction='column' align='center'>
                <Flex
                    justify='space-between'
                    align='center'
                    w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                    h='56px'
                >
                    <Text
                        fontWeight='700'
                        fontSize='12px'
                        lineHeight='133%'
                        letterSpacing='0.05em'
                        color='#2db100'
                        ml={{ sm: '24px', base: '8px' }}
                    >
                        ИНГРЕДИЕНТЫ
                    </Text>
                    <Flex align='center' gap={{ sm: '16px', base: '12px' }}>
                        <Text
                            fontWeight='700'
                            fontSize='12px'
                            lineHeight='133%'
                            letterSpacing='0.05em'
                            color='#2db100'
                        >
                            ПОРЦИЙ
                        </Text>
                        <NumberInput
                            w={{ sm: '90px', base: '73px' }}
                            min={1}
                            value={servings}
                            onChange={handleChange}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper data-test-id='increment-stepper' />
                                <NumberDecrementStepper data-test-id='decrement-stepper' />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                </Flex>
                <Flex
                    direction='column'
                    w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                >
                    {scaledIngredients?.map((item, i) => (
                        <Flex
                            data-test-id={`ingredient-quantity-${i}`}
                            justify='space-between'
                            key={i}
                            h='52px'
                            align='center'
                            bgColor={i % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : ''}
                        >
                            <Text
                                fontWeight='500'
                                fontSize='14px'
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.92)'
                                ml={{ sm: '24px', base: '8px' }}
                            >
                                {item.title}
                            </Text>
                            <Flex mr={{ sm: '24px', base: '8px' }}>
                                <Text
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                    color='rgba(0, 0, 0, 0.92)'
                                >
                                    {item.count} {item.measureUnit}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex mt='40px' direction='column' align='center'>
                <Flex
                    direction='column'
                    align='flex-start'
                    w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                    gap='20px'
                >
                    <Text
                        fontWeight='500'
                        fontSize={{ md: '48px', base: '24px' }}
                        lineHeight='100%'
                        textAlign='start'
                    >
                        Шаги приготовления
                    </Text>
                    {recipe?.steps.map((item, i) => (
                        <Flex
                            key={i}
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='8px'
                            w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                            h={{ md: '244px', base: '128px' }}
                        >
                            <Image
                                src={item.image}
                                maxW={{ md: '346px', base: '158px' }}
                                w='100%'
                            />
                            <Flex direction='column' mt='20px' ml='24px' gap='16px'>
                                <Flex
                                    justify='center'
                                    align='center'
                                    borderRadius='4px'
                                    w='55px'
                                    h='24px'
                                    bg='rgba(0, 0, 0, 0.06)'
                                >
                                    <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                        Шаг {item.stepNumber}
                                    </Text>
                                </Flex>
                                <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                    {item.description}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex mt='40px' direction='column' align='center'>
                <Flex
                    // direction='column'
                    justify='space-between'
                    align='flex-start'
                    w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                    h={{ sm: '144px', base: '120px' }}
                    bg='#c4ff61'
                    position={{ base: 'relative', sm: 'static' }}
                >
                    <Flex>
                        <Image
                            src={authorRecipe}
                            w='96px'
                            h='96px'
                            borderRadius='50%'
                            m={{ sm: '24px 0 0 24px', base: '12px 0 0 12px' }}
                        />
                        <Flex direction='column' m={{ sm: '24px 0 0 16px', base: '20px 0 0 8px' }}>
                            <Text
                                fontWeight='700'
                                fontSize={{ md: '24px', base: '18px' }}
                                lineHeight='133%'
                            >
                                Сергей Разумов
                            </Text>
                            <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                @serge25
                            </Text>
                            <Button
                                mt='16px'
                                borderRadius='6px'
                                w='114px'
                                h='24px'
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                bg='rgba(0, 0, 0, 0.92)'
                                _hover={{ bg: 'rgba(0, 0, 0, 0.6)' }}
                            >
                                <Flex gap='6px' justify='center' align='center'>
                                    <Image src={leftIcon} w='12px' h='12px' />
                                    <Text
                                        color='#fff'
                                        fontWeight='600'
                                        fontSize='12px'
                                        lineHeight='133%'
                                    >
                                        Подписаться
                                    </Text>
                                </Flex>
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex direction='column' justify='space-between' h='96px' m='24px 24px 0 0 '>
                        <Box position={{ base: 'absolute', sm: 'static' }} top='8px' right='8px'>
                            <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                Автор рецепта
                            </Text>
                        </Box>
                        <Flex
                            justify='flex-end'
                            gap='6px'
                            position={{ base: 'absolute', sm: 'static' }}
                            bottom='16px'
                            right='16px'
                        >
                            <Image src={peopleIcon} w='12px' h='12px' />
                            <Text
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color=' #2db100'
                            >
                                125
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <NewRecipesSection />
        </Flex>
    );
};
