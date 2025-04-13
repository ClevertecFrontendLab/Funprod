export type FooterListItem = {
    Icon: string; // путь к иконке (скорее всего string)
    title: string;
};

type FooterCardIcon = {
    icon: string; // путь к иконке
    count: number;
};

type FooterCardLabel = {
    icon: string;
    label: string;
};

export type FooterCardItem = {
    title: string;
    description: string;
    labels: FooterCardLabel;
    icons: FooterCardIcon[];
};
