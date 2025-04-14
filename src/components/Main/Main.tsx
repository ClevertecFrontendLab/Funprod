import { Flex } from '@chakra-ui/react';

import { Footer } from '../Footer/Footer';
import { PageHeader } from '../PageHeader/PageHeader';
import { CookingBlogsSection } from './CookingBlogsSection/CookingBlogsSection';
import { footerMainCard, footerMainList } from './FooterMainData';
import { JuiciestSection } from './JuiciestSection/JuiciestSection';
import { NewRecipesSection } from './NewRecipesSection/NewRecipesSection';

export const Main = () => (
    <Flex
        maxW={{
            base: '328px',
            sm: '728px',
            md: '880px',
            lg: '1360px',
        }}
        w='100%'
        direction='column'
        m={{ base: '64px 16px 100px 16px', sm: '64px 72px 100px 24px', md: '80px 72px 0 24px' }}
    >
        <PageHeader title='Приятного аппетита!' />
        <NewRecipesSection />
        <JuiciestSection />
        <CookingBlogsSection />
        <Footer
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            card={footerMainCard}
            list={footerMainList}
        />
    </Flex>
);
