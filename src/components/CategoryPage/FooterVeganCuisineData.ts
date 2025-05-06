import { FooterCardItem, FooterListItem } from '../Footer/type';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import child from './../../assets/sidebar/child-tasty.svg';
import international from './../../assets/sidebar/international-food.svg';
import vegan from './../../assets/sidebar/vegan.svg';

export const footerVeganCuisineList: FooterListItem[] = [
    {
        Icon: child,
        title: 'Домашние сырные палочки',
    },
    {
        Icon: international,
        title: 'Панкейки',
    },
    {
        Icon: vegan,
        title: 'Воздушное банановое печенье на сковороде',
    },
];

export const footerVeganCuisineCard: FooterCardItem[] = [
    {
        title: 'Бананово-молочное желе',
        description:
            'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
        labels: {
            icon: child,
            label: 'Детские блюда',
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
        title: 'Нежный сливочно-сырный крем для кексов',
        description:
            'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
        labels: {
            icon: child,
            label: 'Детские блюда',
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
