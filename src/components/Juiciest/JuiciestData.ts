import spaghetti from './../../assets//main/juiciest/spaghetti.jpg';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import lasagna from './../../assets/juiciest/lasagna.jpg';
import potatoes from './../../assets/juiciest/potatoes.jpg';
import potatoRolls from './../../assets/juiciest/potatoRolls.jpg';
import alex from './../../assets/main/juiciest/alex.jpg';
import elena from './../../assets/main/juiciest/elena.jpg';
import ham from './../../assets/main/juiciest/ham.jpg';
import noodles from './../../assets/main/juiciest/noodles.jpg';
import tomYm from './../../assets/main/juiciest/tom-ym.jpg';
import child from './../../assets/sidebar/child-tasty.svg';
import grill from './../../assets/sidebar/grill.svg';
import international from './../../assets/sidebar/international-food.svg';
import secondCourses from './../../assets/sidebar/SecondCourses.svg';

export const juiciestCard = [
    {
        imgUrl: spaghetti,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 185,
            },
            {
                icon: emojiHeartEyes,
                count: 159,
            },
        ],
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
    {
        imgUrl: ham,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 159,
            },
            {
                icon: emojiHeartEyes,
                count: 257,
            },
        ],
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: elena,
            userName: 'Елена Высоцкая',
        },
    },
    {
        imgUrl: noodles,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 258,
            },
            {
                icon: emojiHeartEyes,
                count: 342,
            },
        ],
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: alex,
            userName: ' Alex Cook',
        },
    },
    {
        imgUrl: tomYm,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 124,
            },
            {
                icon: emojiHeartEyes,
                count: 324,
            },
        ],
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
    {
        imgUrl: potatoes,
        labels: {
            icon: international,
            label: 'Национальные',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 85,
            },
            {
                icon: emojiHeartEyes,
                count: 152,
            },
        ],
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
    {
        imgUrl: potatoRolls,
        labels: {
            icon: child,
            label: 'Детские блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 85,
            },
            {
                icon: emojiHeartEyes,
                count: 152,
            },
        ],
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',
    },
    {
        imgUrl: lasagna,
        labels: {
            icon: grill,
            label: 'Блюда на гриле',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 124,
            },
            {
                icon: emojiHeartEyes,
                count: 324,
            },
        ],
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
    {
        imgUrl: tomYm,
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 124,
            },
            {
                icon: emojiHeartEyes,
                count: 324,
            },
        ],
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        recommendations: {
            userImg: null,
            userName: null,
        },
    },
];
