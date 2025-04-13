import blanks from './../../assets/sidebar/blanks.svg';
import child from './../../assets/sidebar/child-tasty.svg';
import drink from './../../assets/sidebar/drink.svg';
import firstCourses from './../../assets/sidebar/FirstCourses.svg';
import grill from './../../assets/sidebar/grill.svg';
import health from './../../assets/sidebar/health.svg';
import international from './../../assets/sidebar/international-food.svg';
import pastry from './../../assets/sidebar/pastry.svg';
import salad from './../../assets/sidebar/salad.svg';
import sauces from './../../assets/sidebar/sauces.svg';
import secondCourses from './../../assets/sidebar/SecondCourses.svg';
import snacks from './../../assets/sidebar/snacks.svg';
import vegan from './../../assets/sidebar/vegan.svg';

type SidebarItem = {
    name: string;
    path: string;
};

type SidebarSection = {
    title: string;
    path?: string;
    items: SidebarItem[];
    IconUrl: string;
};

export const sidebarMenu: SidebarSection[] = [
    {
        title: 'Салаты',
        items: [
            { name: 'Мясные салаты', path: '' },
            { name: 'Рыбные салаты', path: '' },
            { name: 'Овощные салаты', path: '' },
            { name: 'Теплые салаты', path: '' },
        ],
        IconUrl: salad,
    },
    {
        title: 'Закуски',
        items: [
            { name: 'Мясные закуски', path: '' },
            { name: 'Рыбные закуски', path: '' },
            { name: 'Овощные закуски', path: '' },
            { name: 'Теплые закуски', path: '' },
            { name: 'Бутерброды', path: '' },
            { name: 'Фастфуд', path: '' },
        ],
        IconUrl: snacks,
    },
    {
        title: 'Первые блюда',
        items: [
            { name: 'Мясные супы', path: '' },
            { name: 'Овощные супы', path: '' },
            { name: 'Бульоны', path: '' },
            { name: 'Холодные супы', path: '' },
            { name: 'Диетические супы', path: '' },
        ],
        IconUrl: firstCourses,
    },
    {
        title: 'Вторые блюда',
        items: [
            { name: 'Мясные', path: '' },
            { name: 'Рыбные', path: '' },
            { name: 'Овощные', path: '' },
            { name: 'Из птицы', path: '' },
            { name: 'Из грибов', path: '' },
            { name: 'Из субпродуктов', path: '' },
            { name: 'На пару', path: '' },
            { name: 'Пельмени, вареники', path: '' },
            { name: 'Мучные гарниры', path: '' },
            { name: 'Овощные гарниры', path: '' },
            { name: 'Пицца', path: '' },
            { name: 'Суши', path: '' },
        ],
        IconUrl: secondCourses,
    },
    {
        title: 'Десерты, выпечка',
        items: [
            { name: 'Блины и оладьи', path: '' },
            { name: 'Пироги и пончики', path: '' },
            { name: 'Торты', path: '' },
            { name: 'Рулеты', path: '' },
            { name: 'Кексы и маффины', path: '' },
            { name: 'Сырники и ватрушки', path: '' },
            { name: 'Из слоеного теста', path: '' },
            { name: 'Из заварного теста', path: '' },
            { name: 'Из дрожжевого теста', path: '' },
            { name: 'Булочки и сдоба', path: '' },
            { name: 'Хлеб', path: '' },
            { name: 'Тесто на пиццу', path: '' },
            { name: 'Кремы', path: '' },
        ],
        IconUrl: pastry,
    },
    {
        title: 'Блюда на гриле',
        items: [
            { name: 'Говядина', path: '' },
            { name: 'Свинина', path: '' },
            { name: 'Птица', path: '' },
            { name: 'Рыба', path: '' },
            { name: 'Грибы', path: '' },
            { name: 'Овощи', path: '' },
        ],
        IconUrl: grill,
    },
    {
        title: 'Веганская кухня',
        path: '/vegan-cuisine',
        items: [
            { name: 'Закуски', path: '' },
            { name: 'Первые блюда', path: '' },
            { name: 'Вторые блюда', path: '/vegan-cuisine/second-courses' },
            { name: 'Гарниры', path: '' },
            { name: 'Десерты', path: '' },
            { name: 'Выпечка', path: '' },
            { name: 'Сыроедческие блюда', path: '' },
            { name: 'Напитки', path: '' },
        ],
        IconUrl: vegan,
    },
    {
        title: 'Детские блюда',
        items: [
            { name: 'Первые блюда', path: '' },
            { name: 'Вторые блюда', path: '' },
            { name: 'Гарниры', path: '' },
            { name: 'Выпечка', path: '' },
            { name: 'Без глютена', path: '' },
            { name: 'Без сахара', path: '' },
            { name: 'Без аллергенов', path: '' },
            { name: 'Блюда для прикорма', path: '' },
        ],
        IconUrl: child,
    },
    {
        title: 'Лечебное питание',
        items: [
            { name: 'Детская диета', path: '' },
            { name: 'Диета №1', path: '' },
            { name: 'Диета №2', path: '' },
            { name: 'Диета №3', path: '' },
            { name: 'Диета №5', path: '' },
            { name: 'Диета №6', path: '' },
            { name: 'Диета №7', path: '' },
            { name: 'Диета №8', path: '' },
            { name: 'Диета №9', path: '' },
            { name: 'Диета №10', path: '' },
            { name: 'Диета №11', path: '' },
            { name: 'Диета №12', path: '' },
            { name: 'Диета №13', path: '' },
            { name: 'Диета №14', path: '' },
            { name: 'Без глютена', path: '' },
            { name: 'Без аллергенов', path: '' },
        ],
        IconUrl: health,
    },
    {
        title: 'Национальные',
        items: [
            { name: 'Американская кухня', path: '' },
            { name: 'Армянская кухня', path: '' },
            { name: 'Греческая кухня', path: '' },
            { name: 'Грузинская кухня', path: '' },
            { name: 'Итальянская кухня', path: '' },
            { name: 'Испанская кухня', path: '' },
            { name: 'Китайская кухня', path: '' },
            { name: 'Мексиканская кухня', path: '' },
            { name: 'Паназиатская кухня', path: '' },
            { name: 'Русская кухня', path: '' },
            { name: 'Турецкая кухня', path: '' },
            { name: 'Французская кухня', path: '' },
            { name: 'Шведская кухня', path: '' },
            { name: 'Японская кухня', path: '' },
            { name: 'Другая кухня', path: '' },
        ],
        IconUrl: international,
    },
    {
        title: 'Соусы',
        items: [
            { name: 'Соусы мясные', path: '' },
            { name: 'Соусы сырные', path: '' },
            { name: 'Маринады', path: '' },
        ],
        IconUrl: sauces,
    },
    {
        title: 'Напитки',
        items: [
            { name: 'Соки и фреши', path: '' },
            { name: 'Смузи', path: '' },
            { name: 'Компоты', path: '' },
            { name: 'Кисели', path: '' },
            { name: 'Кофе', path: '' },
            { name: 'Лечебный чай', path: '' },
            { name: 'Квас', path: '' },
            { name: 'Коктейли', path: '' },
            { name: 'Алкогольные', path: '' },
        ],
        IconUrl: drink,
    },
    {
        title: 'Заготовки',
        items: [
            { name: 'Мясные заготовки', path: '' },
            { name: 'Рыбные заготовки', path: '' },
            { name: 'Из огурцов', path: '' },
            { name: 'Из томатов', path: '' },
            { name: 'Из грибов', path: '' },
            { name: 'Овощные заготовки', path: '' },
            { name: 'Салаты, икра', path: '' },
            { name: 'Из фруктов и ягод', path: '' },
        ],
        IconUrl: blanks,
    },
];
