import { FooterCardItem, FooterListItem } from '../Footer/type';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import firstCoursesIcon from './../../assets/sidebar/FirstCourses.svg';
import secondCourses from './../../assets/sidebar/SecondCourses.svg';

export const footerMainList: FooterListItem[] = [
    {
        Icon: secondCourses,
        title: 'Стейк для вегетарианцев',
    },
    {
        Icon: secondCourses,
        title: 'Котлеты из гречки и фасоли',
    },
    {
        Icon: firstCoursesIcon,
        title: 'Сырный суп с лапшой и брокколи',
    },
];

export const footerMainCard: FooterCardItem[] = [
    {
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 1,
            },
            {
                icon: emojiHeartEyes,
                count: 1,
            },
        ],
    },
    {
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        labels: {
            icon: secondCourses,
            label: 'Вторые блюда',
        },
        icons: [
            {
                icon: bookmarkHeart,
                count: 2,
            },
            {
                icon: emojiHeartEyes,
                count: 1,
            },
        ],
    },
];
