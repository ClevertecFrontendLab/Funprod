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

export const sidebarMenu = [
    {
        title: 'Салаты',
        items: ['Мясные салаты', 'Рыбные салаты', 'Овощные салаты', 'Теплые салаты'],
        IconUrl: salad,
    },
    {
        title: 'Закуски',
        items: [
            'Мясные закуски',
            'Рыбные закуски',
            'Овощные закуски',
            'Теплые закуски',
            'Бутерброды',
            'Фастфуд',
        ],
        IconUrl: snacks,
    },
    {
        title: 'Первые блюда',
        items: ['Мясные супы', 'Овощные супы', 'Бульоны', 'Холодные супы', 'Диетические супы'],
        IconUrl: firstCourses,
    },
    {
        title: 'Вторые блюда',
        items: [
            'Мясные',
            'Рыбные',
            'Овощные',
            'Из птицы',
            'Из грибов',
            'Из субпродуктов',
            'На пару',
            'Пельмени, вареники',
            'Мучные гарниры',
            'Овощные гарниры',
            'Пицца',
            'Суши',
        ],
        IconUrl: secondCourses,
    },
    {
        title: 'Десерты, выпечка',
        items: [
            'Блины и оладьи',
            'Пироги и пончики',
            'Торты',
            'Рулеты',
            'Кексы и маффины',
            'Сырники и ватрушки',
            'Из слоеного теста',
            'Из заварного теста',
            'Из дрожжевого теста',
            'Булочки и сдоба',
            'Хлеб',
            'Тесто на пиццу',
            'Кремы',
        ],
        IconUrl: pastry,
    },
    {
        title: 'Блюда на гриле',
        items: ['Говядина', 'Свинина', 'Птица', 'Рыба', 'Грибы', 'Овощи'],
        IconUrl: grill,
    },
    {
        title: 'Веганская кухня',
        items: [
            'Закуски',
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Десерты',
            'Выпечка',
            'Сыроедческие блюда',
            'Напитки',
        ],
        IconUrl: vegan,
    },
    {
        title: 'Детские блюда',
        items: [
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Выпечка',
            'Без глютена',
            'Без сахара',
            'Без аллергенов',
            'Блюда для прикорма',
        ],
        IconUrl: child,
    },
    {
        title: 'Лечебное питание',
        items: [
            'Детская диета',
            'Диета №1',
            'Диета №2',
            'Диета №3',
            'Диета №5',
            'Диета №6',
            'Диета №7',
            'Диета №8',
            'Диета №9',
            'Диета №10',
            'Диета №11',
            'Диета №12',
            'Диета №13',
            'Диета №14',
            'Без глютена',
            'Без аллергенов',
        ],
        IconUrl: health,
    },
    {
        title: 'Национальные',
        items: [
            'Американская кухня',
            'Армянская кухня',
            'Греческая кухня',
            'Грузинская кухня',
            'Итальянская кухня',
            'Испанская кухня',
            'Китайская кухня',
            'Мексиканская кухня',
            'Паназиатская кухня',
            'Русская кухня',
            'Турецкая кухня',
            'Французская кухня',
            'Шведская кухня',
            'Японская кухня',
            'Другая кухня',
        ],
        IconUrl: international,
    },
    {
        title: 'Соусы',
        items: ['Соусы мясные', 'Соусы сырные', 'Маринады'],
        IconUrl: sauces,
    },
    {
        title: 'Напитки',
        items: [
            'Соки и фреши',
            'Смузи',
            'Компоты',
            'Кисели',
            'Кофе',
            'Лечебный чай',
            'Квас',
            'Коктейли',
            'Алкогольные',
        ],
        IconUrl: drink,
    },
    {
        title: 'Заготовки',
        items: [
            'Мясные заготовки',
            'Рыбные заготовки',
            'Из огурцов',
            'Из томатов',
            'Из грибов',
            'Овощные заготовки',
            'Салаты, икра',
            'Из фруктов и ягод',
        ],
        IconUrl: blanks,
    },
];
